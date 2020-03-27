import { Repository } from '../core/repository';
import {
  UserRepositoryInfoResponseRootObject,
  UserRepositoryInfoResponseUser,
  UserRepositorySearchResponseRootObject,
  UserRepositorySearchResponseUsersItem,
} from '../responses';
import { IgExactUserNotFoundError } from '../errors';
import { UserLookupOptions } from '../types/user.lookup.options';
import { defaults } from 'lodash';
import * as Chance from 'chance';

export class UserRepository extends Repository {
  async info(id: string | number): Promise<UserRepositoryInfoResponseUser> {
    const { data } = await this.client.request.send<UserRepositoryInfoResponseRootObject>({
      url: `/api/v1/users/${id}/info/`,
    });
    return data.user;
  }

  async arlinkDownloadInfo() {
    const { data } = await this.client.request.send({
      url: `/api/v1/users/arlink_download_info/`,
      params: {
        version_override: '2.0.2',
      },
    });
    return data.user;
  }

  async search(username: string): Promise<UserRepositorySearchResponseRootObject> {
    const { data } = await this.client.request.send<UserRepositorySearchResponseRootObject>({
      url: `/api/v1/users/search/`,
      params: {
        timezone_offset: this.client.state.timezoneOffset,
        q: username,
        count: 30,
      },
    });
    return data;
  }

  async searchExact(username: string): Promise<UserRepositorySearchResponseUsersItem> {
    username = username.toLowerCase();
    const result = await this.search(username);
    const users = result.users;
    const account = users.find(user => user.username === username);
    if (!account) {
      throw new IgExactUserNotFoundError();
    }
    return account;
  }

  async accountDetails(id?: string | number) {
    id = id || this.client.state.cookieUserId;
    const { data } = await this.client.request.send({
      url: `/api/v1/users/${id}/account_details/`,
    });
    return data;
  }

  async formerUsernames(id?: string | number) {
    id = id || this.client.state.cookieUserId;
    const { data } = await this.client.request.send({
      url: `/api/v1/users/${id}/former_usernames/`,
    });
    return data;
  }

  async sharedFollowerAccounts(id: string | number) {
    const { data } = await this.client.request.send({
      url: `/api/v1/users/${id}/shared_follower_accounts/`,
    });
    return data;
  }

  async flagUser(id: string | number) {
    const { data } = await this.client.request.send({
      url: `/api/v1/users/${id}/flag_user/`,
      method: 'POST',
      data: {
        _csrftoken: this.client.state.cookieCsrfToken,
        _uid: this.client.state.cookieUserId,
        _uuid: this.client.state.uuid,
        reason_id: 1,
        user_id: id,
        source_name: 'profile',
        is_spam: true,
      },
    });
    return data;
  }

  async getIdByUsername(username: string): Promise<number> {
    const user = await this.searchExact(username);
    return user.pk;
  }

  public async lookup(options: UserLookupOptions) {
    options = defaults(options, {
      waterfallId: new Chance().guid({ version: 4 }),
      directlySignIn: true,
      countryCodes: [{ country_code: '1', source: ['default'] }],
    });
    const { data } = await this.client.request.send({
      url: '/api/v1/users/lookup/',
      method: 'POST',
      data: this.client.request.sign({
        country_codes: JSON.stringify(options.countryCodes),
        _csrftoken: this.client.state.cookieCsrfToken,
        q: options.query,
        guid: this.client.state.uuid,
        device_id: this.client.state.deviceId,
        waterfall_id: options.waterfallId,
        directly_sign_in: options.directlySignIn.toString(),
      }),
    });
    return data;
  }
}

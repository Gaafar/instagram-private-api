import { Expose, plainToClassFromExist } from 'class-transformer';
import { Feed } from '../core/feed';
import { AccountFollowingFeedResponse, AccountFollowingFeedResponseUsersItem } from '../responses';

export class AccountFollowingFeed extends Feed<AccountFollowingFeedResponse, AccountFollowingFeedResponseUsersItem> {
  id: number | string;
  @Expose()
  private nextMaxId: string;

  set state(body: AccountFollowingFeedResponse) {
    this.moreAvailable = !!body.next_max_id;
    this.nextMaxId = body.next_max_id;
  }

  async request() {
    const { data } = await this.client.request.send<AccountFollowingFeedResponse>({
      url: `/api/v1/friendships/${this.id}/following/`,
      params: {
        rank_token: this.rankToken,
        max_id: this.nextMaxId,
      },
    });
    this.state = data;
    return data;
  }

  async items() {
    const body = await this.request();
    return body.users.map(user => plainToClassFromExist(new AccountFollowingFeedResponseUsersItem(this.client), user));
  }
}

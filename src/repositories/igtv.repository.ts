import { Repository } from '../core/repository';
import { IgtvWriteSeenStateOptions } from '../types';
import { defaults } from 'lodash';
import { StatusResponse, IgtvSearchResponseRootObject } from '../responses';
import * as Chance from 'chance';

export class IgtvRepository extends Repository {
  public async writeSeenState(options: IgtvWriteSeenStateOptions): Promise<StatusResponse> {
    const { data } = await this.client.request.send({
      url: '/api/v1/igtv/write_seen_state/',
      method: 'POST',
      data: this.client.request.sign({
        seen_state: JSON.stringify(defaults(options, { impressions: {}, grid_impressions: [] })),
        _csrftoken: this.client.state.cookieCsrfToken,
        _uid: this.client.state.cookieUserId,
        _uuid: this.client.state.uuid,
      }),
    });
    return data;
  }

  public async search(query: string = ''): Promise<IgtvSearchResponseRootObject> {
    const { data } = await this.client.request.send<IgtvSearchResponseRootObject>({
      // this is the same method in the app
      url: `/api/v1/igtv/${query && query.length > 0 ? 'search' : 'suggested_searches'}/`,
      method: 'GET',
      params: {
        query,
      },
    });
    return data;
  }

  public async allUserSeries(user: string | number, form: object = {}) {
    const { data } = await this.client.request.send({
      url: `/api/v1/igtv/series/all_user_series/${user}/`,
      method: 'GET',
      params: this.client.request.sign(form),
    });
    return data;
  }

  public async createSeries(title: string, description: string = '') {
    const { data } = await this.client.request.send({
      url: `/api/v1/igtv/series/create/`,
      method: 'POST',
      data: this.client.request.sign({
        title,
        description,
        igtv_composer_session_id: new Chance().guid({ version: 4 }),
        _csrftoken: this.client.state.cookieCsrfToken,
        _uid: this.client.state.cookieUserId,
        _uuid: this.client.state.uuid,
      }),
    });
    return data;
  }

  public async seriesAddEpisode(series: string | number, mediaId: string) {
    const { data } = await this.client.request.send({
      url: `/api/v1/igtv/series/${series}/add_episode/`,
      method: 'POST',
      data: {
        media_id: mediaId,
        _csrftoken: this.client.state.cookieCsrfToken,
        _uuid: this.client.state.uuid,
      },
    });
    return data;
  }
}

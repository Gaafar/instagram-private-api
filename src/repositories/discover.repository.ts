import { Repository } from '../core/repository';
import { DiscoverRepositoryChainingResponseRootObject } from '../responses/discover.repository.chaining.response';

export class DiscoverRepository extends Repository {
  /**
   * Gets the suggestions based on a user
   * @param targetId user id/pk
   */
  async chaining(targetId: string): Promise<DiscoverRepositoryChainingResponseRootObject> {
    const { data } = await this.client.request.send<DiscoverRepositoryChainingResponseRootObject>({
      url: '/api/v1/discover/chaining/',
      params: {
        target_id: targetId,
      },
    });
    return data;
  }

  async topicalExplore() {
    const { data } = await this.client.request.send({
      url: '/api/v1/discover/topical_explore/',
      params: {
        is_prefetch: true,
        omit_cover_media: false,
        use_sectional_payload: true,
        timezone_offset: this.client.state.timezoneOffset,
        session_id: this.client.state.clientSessionId,
        include_fixed_destinations: false,
      },
    });
    return data;
  }

  async markSuSeen() {
    const { data } = await this.client.request.send({
      url: '/api/v1/discover/mark_su_seen/',
      method: 'POST',
      data: this.client.request.sign({
        _csrftoken: this.client.state.cookieCsrfToken,
        _uuid: this.client.state.uuid,
      }),
    });
    return data;
  }

  async profileSuBadge() {
    const { data } = await this.client.request.send({
      url: '/api/v1/discover/profile_su_badge/',
      method: 'POST',
      data: this.client.request.sign({
        _csrftoken: this.client.state.cookieCsrfToken,
        _uuid: this.client.state.uuid,
      }),
    });
    return data;
  }
}

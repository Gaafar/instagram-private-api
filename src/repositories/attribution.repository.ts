import { Repository } from '../core/repository';

export class AttributionRepository extends Repository {
  public async logAttribution() {
    const { data } = await this.client.request.send({
      method: 'POST',
      url: '/api/v1/attribution/log_attribution/',
      data: this.client.request.sign({
        adid: this.client.state.adid,
      }),
    });
    return data;
  }
  // This method participates in post-login flow
  // And it crashes in official IG app, so we just catch it and return error
  public async logResurrectAttribution() {
    try {
      const { data } = await this.client.request.send({
        method: 'POST',
        url: '/api/v1/attribution/log_resurrect_attribution/',
        data: this.client.request.sign({
          _csrftoken: this.client.state.cookieCsrfToken,
          _uid: this.client.state.cookieUserId,
          adid: this.client.state.adid,
          _uuid: this.client.state.uuid,
        }),
      });
      return data;
    } catch (e) {
      return e;
    }
  }
}

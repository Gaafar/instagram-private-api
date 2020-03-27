import { Repository } from '../core/repository';

export class CreativesRepository extends Repository {
  public async writeSupportedCapabilities() {
    const { data } = await this.client.request.send({
      url: '/api/v1/creatives/write_supported_capabilities/',
      method: 'POST',
      data: this.client.request.sign({
        supported_capabilities_new: JSON.stringify(this.client.state.supportedCapabilities),
        _csrftoken: this.client.state.cookieCsrfToken,
        _uid: this.client.state.cookieUserId,
        _uuid: this.client.state.uuid,
      }),
    });
    return data;
  }
}

import { Repository } from '../core/repository';

export class QeRepository extends Repository {
  public syncExperiments() {
    return this.sync(this.client.state.experiments);
  }
  public async syncLoginExperiments() {
    return this.sync(this.client.state.loginExperiments);
  }
  public async sync(experiments) {
    let form;
    try {
      const uid = this.client.state.cookieUserId;
      form = {
        _csrftoken: this.client.state.cookieCsrfToken,
        id: uid,
        _uid: uid,
        _uuid: this.client.state.uuid,
      };
    } catch {
      form = {
        id: this.client.state.uuid,
      };
    }
    form = Object.assign(form, { experiments });
    const { data } = await this.client.request.send({
      method: 'POST',
      url: '/api/v1/qe/sync/',
      headers: {
        'X-DEVICE-ID': this.client.state.uuid,
      },
      data: this.client.request.sign(form),
    });
    return data;
  }
}

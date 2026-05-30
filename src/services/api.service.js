import { allure } from 'allure-playwright';

export class ApiService {
  constructor(request, baseURL) {
    this.request = request;
    this.baseURL = baseURL.replace(/\/$/, '');
  }

  async get(endpoint, headers = {}) {
    const url = `${this.baseURL}${endpoint}`;
    return await allure.step(`GET ${endpoint}`, async () => {
      const res = await this.request.get(url, { headers });
      await this._attachResponse(res);
      return res;
    });
  }

  async post(endpoint, data, headers = {}) {
    const url = `${this.baseURL}${endpoint}`;
    return await allure.step(`POST ${endpoint}`, async () => {
      const res = await this.request.post(url, {
        headers: { 'Content-Type': 'application/json', ...headers },
        data
      });
      await this._attachResponse(res);
      return res;
    });
  }

  async put(endpoint, data, headers = {}) {
    const url = `${this.baseURL}${endpoint}`;
    return await allure.step(`PUT ${endpoint}`, async () => {
      const res = await this.request.put(url, {
        headers: { 'Content-Type': 'application/json', ...headers },
        data
      });
      await this._attachResponse(res);
      return res;
    });
  }

  async patch(endpoint, data, headers = {}) {
    const url = `${this.baseURL}${endpoint}`;
    return await allure.step(`PATCH ${endpoint}`, async () => {
      const res = await this.request.patch(url, {
        headers: { 'Content-Type': 'application/json', ...headers },
        data
      });
      await this._attachResponse(res);
      return res;
    });
  }

  async delete(endpoint, headers = {}) {
    const url = `${this.baseURL}${endpoint}`;
    return await allure.step(`DELETE ${endpoint}`, async () => {
      const res = await this.request.delete(url, { headers });
      await this._attachResponse(res);
      return res;
    });
  }

  async _attachResponse(res) {
    const status = res.status();
    const ct = res.headers()['content-type'] || '';
    let body;
    try {
      body = ct.includes('json') ? JSON.stringify(await res.json(), null, 2) : await res.text();
    } catch {
      body = await res.text();
    }
    await allure.attachment(
      `Response ${status}`,
      Buffer.from(body),
      ct.includes('json') ? 'application/json' : 'text/plain'
    );
  }
}

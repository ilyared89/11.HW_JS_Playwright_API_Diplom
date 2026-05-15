// @ts-check
import { allure } from 'allure-playwright';

export class ApiService {
  constructor(request, baseURL = 'https://reqres.in') {
    this.request = request;
    this.baseURL = baseURL.replace(/\/$/, '');
  }

  async get(path, options) {
    const url = `${this.baseURL}${path}`;
    return await allure.step(`GET ${path}`, async () => {
      const res = await this.request.get(url, options);
      await this.#attachResponse(res);
      return res;
    });
  }

  async post(path, data, options = {}) {
    const url = `${this.baseURL}${path}`;
    return await allure.step(`POST ${path}`, async () => {
      const res = await this.request.post(url, {
        data,
        headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
        ...options,
      });
      await this.#attachResponse(res);
      return res;
    });
  }

  async put(path, data, options = {}) {
    const url = `${this.baseURL}${path}`;
    return await allure.step(`PUT ${path}`, async () => {
      const res = await this.request.put(url, {
        data,
        headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
        ...options,
      });
      await this.#attachResponse(res);
      return res;
    });
  }

  async patch(path, data, options = {}) {
    const url = `${this.baseURL}${path}`;
    return await allure.step(`PATCH ${path}`, async () => {
      const res = await this.request.patch(url, {
        data,
        headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
        ...options,
      });
      await this.#attachResponse(res);
      return res;
    });
  }

  async delete(path, options) {
    const url = `${this.baseURL}${path}`;
    return await allure.step(`DELETE ${path}`, async () => {
      const res = await this.request.delete(url, options);
      await this.#attachResponse(res);
      return res;
    });
  }

  async #attachResponse(res) {
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

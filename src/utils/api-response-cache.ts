import type { APIResponse } from "../types/api-response.type";

export class APIResponseCache<T extends APIResponse<unknown>> {
  protected prefix = "sky-scrapper:";

  constructor(private readonly cacheKey: string) {
    this.cacheKey = `${this.prefix}${cacheKey}`;
  }

  get response() {
    const cachedData = window.localStorage.getItem(this.cacheKey);

    if (!cachedData) return null;

    return { data: JSON.parse(cachedData) as T };
  }

  store(data: T) {
    data.status && window.localStorage.setItem(this.cacheKey, JSON.stringify(data));
  }

  clear() {
    for (const key of Object.keys({ ...window.localStorage })) {
      if (key.startsWith(this.prefix)) {
        window.localStorage.removeItem(key);
      }
    }
  }
}

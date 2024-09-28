const cacheStore: { [key: string]: any } = {};

export const cache = {
  get: (key: string) => {
    return cacheStore[key];
  },
  set: (key: string, data: any) => {
    cacheStore[key] = data;
  }
};

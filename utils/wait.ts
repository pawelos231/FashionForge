export const wait = (ms: number) =>
  new Promise((res, rej) => setTimeout(res, ms));

export function clean(obj: any) {
  Object.keys(obj).forEach((key) => (!obj[key]) && delete obj[key]);
  return obj;
}

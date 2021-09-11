export const deepClone = (item: any) => {
  return JSON.parse(JSON.stringify(item));
};

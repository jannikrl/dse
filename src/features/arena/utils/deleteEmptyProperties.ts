import { deepClone } from "./deepClone";

export function deleteEmptyProperties<T>(obj: T) {
  const result: T = deepClone(obj);
  const keys = Object.keys(result) as [keyof T];
  for (const key of keys) {
    if (result[key] === null) delete result[key];
  }
  return result;
}

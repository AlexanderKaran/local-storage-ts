import { isDate } from "./is_date.ts";
import type { LocalStoreType } from "./types.ts";

export function getLocalStorageType(value: unknown): LocalStoreType {
  const type = typeof value;
  switch (type) {
    case "string":
    case "number":
    case "boolean":
    case "bigint":
    case "symbol":
    case "undefined":
      return type;
    case "function":
      throw new Error("Cannot save function to storage");
    case "object": {
      if (isDate(value)) {
        return "date";
      } else {
        if (Array.isArray(value)) {
          return "array";
        } else {
          return "object";
        }
      }
    }
  }
}

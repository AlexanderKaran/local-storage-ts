import { getTypeKey } from "./get_type_key.ts";
import type { LocalStoreType } from "./types.ts";

/**
 * Validate the saved type of a key
 * @param key The key the data is saved under in local storage
 * @param expectedType The expected type of the data
 *
 * @returns Returns true if the saved type matches the expected type, false if it does not, and null if the key does not exist
 */
export function validateSavedType(
  key: string,
  expectedType: LocalStoreType
): boolean | null {
  const typeKey = getTypeKey(key);
  const currentLocalStorageType = localStorage.getItem(typeKey);
  if (!currentLocalStorageType) return null;
  return currentLocalStorageType === expectedType;
}

import { getTypeKey } from "./get_type_key.ts";

/**
 * Remove a key from local storage and its associated type information
 *
 * @param key The key to remove from local storage
 */
export function removeItemFromStorage(key: string): void {
  localStorage.removeItem(key);
  localStorage.removeItem(getTypeKey(key));
}

/**
 * Get value from local storage by key
 * @param key The key to get value from
 * @returns Returns the value of the key in local storage or null if not found
 */
export function getFromStorage(key: string): string | null {
  return localStorage.getItem(key);
}

/**
 * Save value to local storage by key
 * @param key The key to save value to
 * @param value The value to save to the key, must be a string
 */
export function saveToStorage(key: string, value: string): void {
  return localStorage.setItem(key, value);
}

/**
 * Remove a key from local storage
 * @param key The key to remove from local storage
 */
export function removeFromStorage(key: string): void {
  return localStorage.removeItem(key);
}

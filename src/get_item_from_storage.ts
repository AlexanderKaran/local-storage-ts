import {
	type LocalStorageError,
	LocalStorageFetchTypeError,
	LocalStorageTypeKeyError,
} from './errors.ts';
import { getLocalStorageType } from './get_local_storage_type.ts';
import type { LocalStoreType, Result } from './types.ts';
import { validateSavedType } from './validate_saved_type.ts';

/**
 * Get an item from local storage and validate its type
 *
 * @param key The key to get from local storage
 * @param parser The function to parse the value
 * @param expectedType The expected type of the value
 *
 * @returns The parsed value or null if the key does not exist
 * @throws LocalStorageTypeKeyError
 * @throws LocalStorageFetchTypeError
 */
function getItemAndValidate<T = unknown>(
	key: string,
	parser: (value: string) => T,
	expectedType: LocalStoreType,
): T | null {
	const item = localStorage.getItem(key);
	if (item === null) return null;

	const validated = validateSavedType(key, expectedType);
	if (validated === null) {
		throw new LocalStorageTypeKeyError(key);
	}

	const parsedItem = parser(item);
	if (validated === false) {
		throw new LocalStorageFetchTypeError(
			key,
			expectedType,
			getLocalStorageType(parsedItem),
		);
	}

	return parsedItem;
}

/**
 * Get a string from local storage
 *
 * @param key The key to get from local storage
 *
 * @returns The string value or null if the key does not exist
 * @throws LocalStorageTypeKeyError
 * @throws LocalStorageFetchTypeError
 */
export function getStringFromStorage(key: string): string | null {
	return getItemAndValidate(key, (value) => value, 'string');
}

/**
 * Get a string from local storage safely
 *
 * @param key The key to get from local storage
 *
 * @returns The string value or null if the key does not exist
 */
export function safeGetStringFromStorage(
	key: string,
): Result<string | null, LocalStorageError> {
	try {
		return { success: true, value: getStringFromStorage(key) };
	} catch (error) {
		return { success: false, error };
	}
}

/**
 * Get a number from local storage
 *
 * @param key The key to get from local storage
 *
 * @returns The number value or null if the key does not exist
 * @throws LocalStorageTypeKeyError
 * @throws LocalStorageFetchTypeError
 */
export function getNumberFromStorage(key: string): number | null {
	return getItemAndValidate(key, (value) => Number(value), 'number');
}

/**
 * Get a number from local storage safely
 *
 * @param key The key to get from local storage
 *
 * @returns The number value or null if the key does not exist
 */
export function safeGetNumberFromStorage(
	key: string,
): Result<number | null, LocalStorageError> {
	try {
		return { success: true, value: getNumberFromStorage(key) };
	} catch (error) {
		return { success: false, error };
	}
}

/**
 * Get a boolean from local storage
 *
 * @param key The key to get from local storage
 *
 * @returns The boolean value or null if the key does not exist
 * @throws LocalStorageTypeKeyError
 * @throws LocalStorageFetchTypeError
 */
export function getBooleanFromStorage(key: string): boolean | null {
	return getItemAndValidate(key, (value) => value === 'true', 'boolean');
}

/**
 * Get a boolean from local storage safely
 *
 * @param key The key to get from local storage
 *
 * @returns The boolean value or null if the key does not exist
 */
export function safeGetBooleanFromStorage(
	key: string,
): Result<boolean | null, LocalStorageError> {
	try {
		return { success: true, value: getBooleanFromStorage(key) };
	} catch (error) {
		return { success: false, error };
	}
}

/**
 * Get a bigint from local storage
 *
 * @param key The key to get from local storage
 *
 * @returns The bigint value or null if the key does not exist
 * @throws LocalStorageTypeKeyError
 * @throws LocalStorageFetchTypeError
 */
export function getBigIntFromStorage(key: string): bigint | null {
	return getItemAndValidate(key, (value) => BigInt(value), 'bigint');
}

/**
 * Get a bigint from local storage safely
 *
 * @param key The key to get from local storage
 *
 * @returns The bigint value or null if the key does not exist
 */
export function safeGetBigIntFromStorage(
	key: string,
): Result<bigint | null, LocalStorageError> {
	try {
		return { success: true, value: getBigIntFromStorage(key) };
	} catch (error) {
		return { success: false, error };
	}
}

/**
 * Get a date from local storage
 *
 * @param key The key to get from local storage
 *
 * @returns The date value or null if the key does not exist
 * @throws LocalStorageTypeKeyError
 * @throws LocalStorageFetchTypeError
 */
export function getDateFromStorage(key: string): Date | null {
	return getItemAndValidate(key, (value) => new Date(value), 'date');
}

/**
 * Get a date from local storage safely
 *
 * @param key The key to get from local storage
 *
 * @returns The date value or null if the key does not exist
 */
export function safeGetDateFromStorage(
	key: string,
): Result<Date | null, LocalStorageError> {
	try {
		return { success: true, value: getDateFromStorage(key) };
	} catch (error) {
		return { success: false, error };
	}
}

/**
 * Get an array from local storage
 *
 * @param key The key to get from local storage
 *
 * @returns The array value or null if the key does not exist
 * @throws LocalStorageTypeKeyError
 * @throws LocalStorageFetchTypeError
 */
export function getArrayFromStorage<T = unknown>(key: string): T[] | null {
	return getItemAndValidate(key, (value) => JSON.parse(value), 'array');
}

/**
 * Get an array from local storage safely
 *
 * @param key The key to get from local storage
 *
 * @returns The array value or null if the key does not exist
 */
export function safeGetArrayFromStorage<T = unknown>(
	key: string,
): Result<T[] | null, LocalStorageError> {
	try {
		return { success: true, value: getArrayFromStorage<T>(key) };
	} catch (error) {
		return { success: false, error };
	}
}

/**
 * Get an object from local storage
 *
 * @param key The key to get from local storage
 *
 * @returns The object value or null if the key does not exist
 * @throws LocalStorageTypeKeyError
 * @throws LocalStorageFetchTypeError
 */
export function getObjectFromStorage<
	T = { [key: string | number | symbol]: unknown },
>(key: string): T | null {
	return getItemAndValidate(key, (value) => JSON.parse(value), 'object');
}

/**
 * Get an object from local storage safely
 *
 * @param key The key to get from local storage
 *
 * @returns The object value or null if the key does not exist
 */
export function safeGetObjectFromStorage<
	T = { [key: string | number | symbol]: unknown },
>(key: string): Result<T | null, LocalStorageError> {
	try {
		return { success: true, value: getObjectFromStorage<T>(key) };
	} catch (error) {
		return { success: false, error };
	}
}

/**
 * Get a Map from local storage
 *
 * @param key The key to get from local storage
 *
 * @returns The Map value or null if the key does not exist
 * @throws LocalStorageTypeKeyError
 * @throws LocalStorageFetchTypeError
 */
export function getMapFromStorage<K = unknown, V = unknown>(
	key: string,
): Map<K, V> | null {
	return getItemAndValidate(
		key,
		(value) => new Map(JSON.parse(value)),
		'map',
	);
}

/**
 * Get a Map from local storage safely
 *
 * @param key The key to get from local storage
 *
 * @returns Result<Map<unknown, unknown> | null, LocalStorageError>
 */
export function safeGetMapFromStorage<K = unknown, V = unknown>(
	key: string,
): Result<Map<K, V> | null, LocalStorageError> {
	try {
		const value = getMapFromStorage<K, V>(key);
		return { success: true, value };
	} catch (error) {
		return { success: false, error };
	}
}

/**
 * Get a Set from local storage
 *
 * @param key The key to get from local storage
 *
 * @returns The Set value or null if the key does not exist
 * @throws LocalStorageTypeKeyError
 * @throws LocalStorageFetchTypeError
 */
export function getSetFromStorage<T = unknown>(key: string): Set<T> | null {
	const item = localStorage.getItem(key);
	if (item === null) {
		return null;
	}
	return new Set<T>(JSON.parse(item));
}

/**
 * Get a Set from local storage safely
 *
 * @param key The key to get from local storage
 *
 * @returns Result<Set<unknown> | null, LocalStorageError>
 */
export function safeGetSetFromStorage<T = unknown>(
	key: string,
): Result<Set<T> | null, LocalStorageError> {
	try {
		const value = getSetFromStorage<T>(key);
		return { success: true, value };
	} catch (error) {
		return { success: false, error };
	}
}

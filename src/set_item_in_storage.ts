import { formatValue } from './format_value.ts';
import { getTypeKey } from './get_type_key.ts';
import { getLocalStorageType } from './get_local_storage_type.ts';
import {
	type LocalStorageError,
	LocalStorageInsertTypeError,
	LocalStorageTypeMismatchError,
} from './errors.ts';
import type { LocalStoreType, Result } from './types.ts';

/**
 * Validate the value and set it in local storage if its type matches the expected type
 *
 * @param key The key the data is saved under in local storage
 * @param expectedType The expected type of the data being saved
 * @param value The value to save in local storage
 *
 * @returns void
 * @throws LocalStorageTypeMismatchError
 * @throws LocalStorageInsertTypeError
 */
function validateAndSetItem(
	key: string,
	expectedType: LocalStoreType,
	value?: unknown,
) {
	const typeKey = getTypeKey(key);
	const localStorageType = getLocalStorageType(value);
	const currentLocalStorageType = localStorage.getItem(
		typeKey,
	) as LocalStoreType;

	// Check expected type against value type
	if (expectedType !== localStorageType) {
		throw new LocalStorageInsertTypeError(
			key,
			expectedType,
			localStorageType,
		);
	}

	const currentValueIsUndefined = currentLocalStorageType === 'undefined' &&
		currentLocalStorageType !== localStorageType;

	// No value currently set or current type is undefined
	if (currentLocalStorageType == null || currentValueIsUndefined) {
		localStorage.setItem(typeKey, localStorageType);
		localStorage.setItem(key, formatValue(value) ?? '');
		return;
	}

	// Value already set, validate before setting
	if (currentLocalStorageType !== localStorageType) {
		throw new LocalStorageTypeMismatchError(
			key,
			currentLocalStorageType,
			getLocalStorageType(value),
		);
	}

	localStorage.setItem(key, formatValue(value) ?? '');
}

/**
 * Set a string in local storage
 *
 * @param key The key to save the string under in local storage
 * @param value The string to save in local storage
 *
 * @returns void
 * @throws LocalStorageTypeMismatchError
 * @throws LocalStorageInsertTypeError
 */
export function setStringInStorage(key: string, value?: string): void {
	validateAndSetItem(key, 'string', value);
}

/**
 * Safely set a string in local storage
 *
 * @param key The key to save the string under in local storage
 * @param value The string to save in local storage
 *
 * @returns Result<null, LocalStorageError>
 */
export function safeSetStringInStorage(
	key: string,
	value?: string,
): Result<null, LocalStorageError> {
	try {
		setStringInStorage(key, value);
		return { success: true, value: null };
	} catch (error) {
		return { success: false, error };
	}
}

/**
 * Set a number in local storage
 *
 * @param key The key to save the number under in local storage
 * @param value The number to save in local storage
 *
 * @returns void
 * @throws LocalStorageTypeMismatchError
 * @throws LocalStorageInsertTypeError
 */
export function setNumberInStorage(key: string, value?: number): void {
	validateAndSetItem(key, 'number', value);
}

/**
 * Safely set a number in local storage
 *
 * @param key The key to save the number under in local storage
 * @param value The number to save in local storage
 *
 * @returns Result<null, LocalStorageError>
 */
export function safeSetNumberInStorage(
	key: string,
	value?: number,
): Result<null, LocalStorageError> {
	try {
		setNumberInStorage(key, value);
		return { success: true, value: null };
	} catch (error) {
		return { success: false, error };
	}
}

/**
 * Set a boolean in local storage
 *
 * @param key The key to save the boolean under in local storage
 * @param value The boolean to save in local storage
 *
 * @returns void
 * @throws LocalStorageTypeMismatchError
 * @throws LocalStorageInsertTypeError
 */
export function setBooleanInStorage(key: string, value?: boolean): void {
	validateAndSetItem(key, 'boolean', value);
}

/**
 * Safely set a boolean in local storage
 *
 * @param key The key to save the boolean under in local storage
 * @param value The boolean to save in local storage
 *
 * @returns Result<null, LocalStorageError>
 */
export function safeSetBooleanInStorage(
	key: string,
	value?: boolean,
): Result<null, LocalStorageError> {
	try {
		setBooleanInStorage(key, value);
		return { success: true, value: null };
	} catch (error) {
		return { success: false, error };
	}
}

/**
 * Set a bigint in local storage
 *
 * @param key The key to save the bigint under in local storage
 * @param value The bigint to save in local storage
 *
 * @returns void
 * @throws LocalStorageTypeMismatchError
 * @throws LocalStorageInsertTypeError
 */
export function setBigIntInStorage(key: string, value?: bigint): void {
	validateAndSetItem(key, 'bigint', value);
}

/**
 * Safely set a bigint in local storage
 *
 * @param key The key to save the bigint under in local storage
 * @param value The bigint to save in local storage
 *
 * @returns Result<null, LocalStorageError>
 */
export function safeSetBigIntInStorage(
	key: string,
	value?: bigint,
): Result<null, LocalStorageError> {
	try {
		setBigIntInStorage(key, value);
		return { success: true, value: null };
	} catch (error) {
		return { success: false, error };
	}
}

/**
 * Set a date in local storage
 *
 * @param key The key to save the date under in local storage
 * @param value The date to save in local storage
 *
 * @returns void
 * @throws LocalStorageTypeMismatchError
 * @throws LocalStorageInsertTypeError
 */
export function setDateInStorage(key: string, value?: Date): void {
	validateAndSetItem(key, 'date', value);
}

/**
 * Safely set a date in local storage
 *
 * @param key The key to save the date under in local storage
 * @param value The date to save in local storage
 *
 * @returns Result<null, LocalStorageError>
 */
export function safeSetDateInStorage(
	key: string,
	value?: Date,
): Result<null, LocalStorageError> {
	try {
		setDateInStorage(key, value);
		return { success: true, value: null };
	} catch (error) {
		return { success: false, error };
	}
}

/**
 * Set an array in local storage, the array can contain any type
 *
 * @param key The key to save the array under in local storage
 * @param value The array to save in local storage
 *
 * @returns void
 * @throws LocalStorageTypeMismatchError
 * @throws LocalStorageInsertTypeError
 */
export function setArrayInStorage<T = unknown>(key: string, value?: T[]): void {
	validateAndSetItem(key, 'array', value);
}

/**
 * Safely set an array in local storage, the array can contain any type
 *
 * @param key The key to save the array under in local storage
 * @param value The array to save in local storage
 *
 * @returns Result<null, LocalStorageError>
 */
export function safeSetArrayInStorage<T = unknown>(
	key: string,
	value?: T[],
): Result<null, LocalStorageError> {
	try {
		setArrayInStorage(key, value);
		return { success: true, value: null };
	} catch (error) {
		return { success: false, error };
	}
}

/**
 * Set an object in local storage. The object can have any type as values but the keys must be strings, numbers, or symbols
 *
 * @param key The key to save the object under in local storage
 * @param value The object to save in local storage
 *
 * @returns void
 * @throws LocalStorageTypeMismatchError
 * @throws LocalStorageInsertTypeError
 */
export function setObjectInStorage(
	key: string,
	value?: { [key: string | number | symbol]: unknown },
): void {
	validateAndSetItem(key, 'object', value);
}

/**
 * Safely set an object in local storage. The object can have any type as values but the keys must be strings, numbers, or symbols
 *
 * @param key The key to save the object under in local storage
 * @param value The object to save in local storage
 *
 * @returns Result<null, LocalStorageError>
 */
export function safeSetObjectInStorage(
	key: string,
	value?: { [key: string | number | symbol]: unknown },
): Result<null, LocalStorageError> {
	try {
		setObjectInStorage(key, value);
		return { success: true, value: null };
	} catch (error) {
		return { success: false, error };
	}
}

/**
 * Set a Map in local storage
 *
 * @param key The key to save the Map under in local storage
 * @param value The Map to save in local storage
 *
 * @returns void
 * @throws LocalStorageTypeMismatchError
 * @throws LocalStorageInsertTypeError
 */
export function setMapInStorage(
	key: string,
	value?: Map<unknown, unknown>,
): void {
	validateAndSetItem(key, 'map', value);
}

/**
 * Safely set a Map in local storage
 *
 * @param key The key to save the Map under in local storage
 * @param value The Map to save in local storage
 *
 * @returns Result<null, LocalStorageError>
 */
export function safeSetMapInStorage(
	key: string,
	value?: Map<unknown, unknown>,
): Result<null, LocalStorageError> {
	try {
		setMapInStorage(key, value);
		return { success: true, value: null };
	} catch (error) {
		return { success: false, error };
	}
}

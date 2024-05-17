import type { LocalStoreType } from './types.ts';

export class LocalStorageError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'LocalStorageError';
	}
}

export class LocalStorageInsertTypeError extends LocalStorageError {
	constructor(key: string, expectedType: LocalStoreType, actualType: string) {
		super(`
      Expected type of data to be inserted into local storage to be "${expectedType}" but got "${actualType}" for key "${key}"`);
		this.name = 'LocalStorageInsertTypeError';
	}
}

export class LocalStorageTypeMismatchError extends LocalStorageError {
	constructor(
		key: string,
		expectedType: LocalStoreType,
		actualType: LocalStoreType,
	) {
		super(
			`Expected type of data in local storage to be "${expectedType}" but got "${actualType}" for key "${key}"`,
		);
		this.name = 'LocalStorageTypeMismatchError';
	}
}

export class LocalStorageFetchTypeError extends LocalStorageError {
	constructor(key: string, expectedType: LocalStoreType, actualType: string) {
		super(`
      Expected type of data fetched from local storage to be "${expectedType}" but got "${actualType}" for key "${key}"`);
		this.name = 'LocalStorageFetchTypeError';
	}
}

export class LocalStorageTypeKeyError extends LocalStorageError {
	constructor(key: string) {
		super(
			`Could not find type key for key "${key}", data may be corrupted`,
		);
		this.name = 'LocalStorageTypeKeyError';
	}
}

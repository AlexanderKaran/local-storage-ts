import { isDate } from './is_date.ts';
import { isMap } from './is_map.ts';

export function formatValue(value: unknown): string | undefined {
	switch (typeof value) {
		case 'string':
			return value;
		case 'number':
		case 'boolean':
		case 'bigint':
		case 'symbol':
			return value.toString();
		case 'function':
			throw new Error('Cannot save function to storage');
		case 'undefined':
			return undefined;
		case 'object': {
			if (isDate(value)) {
				return value.toISOString();
			} else if (isMap(value)) {
				return JSON.stringify(Array.from(value.entries()));
			} else {
				// Covers Array<unknown> and object
				return JSON.stringify(value);
			}
		}
	}
}

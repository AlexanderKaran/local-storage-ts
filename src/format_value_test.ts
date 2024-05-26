import {
	assertEquals,
	assertThrows,
} from 'https://deno.land/std@0.224.0/assert/mod.ts';

import { formatValue } from './format_value.ts';

Deno.test('formatValue should correctly format string type', () => {
	const result = formatValue('value');
	assertEquals(result, 'value');
});

Deno.test('formatValue should correctly format number type', () => {
	const result = formatValue(123);
	assertEquals(result, '123');
});

Deno.test('formatValue should correctly format boolean type', () => {
	const result = formatValue(true);
	assertEquals(result, 'true');
});

Deno.test('formatValue should correctly format date type', () => {
	const date = new Date();
	const result = formatValue(date);
	assertEquals(result, date.toISOString());
});

Deno.test('formatValue should correctly format array type', () => {
	const result = formatValue([1, 2, 3]);
	assertEquals(result, JSON.stringify([1, 2, 3]));
});

Deno.test('formatValue should correctly format object type', () => {
	const result = formatValue({ key: 'value' });
	assertEquals(result, JSON.stringify({ key: 'value' }));
});

Deno.test('formatValue should throw error for function type', () => {
	assertThrows(() => formatValue(function () {}));
});

Deno.test('formatValue should return undefined for undefined type', () => {
	const result = formatValue(undefined);
	assertEquals(result, undefined);
});

Deno.test('formatValue formats map correctly', () => {
	const map = new Map();
	map.set('key1', 'value1');
	map.set('key2', 'value2');
	assertEquals(formatValue(map), '[["key1","value1"],["key2","value2"]]');
});

Deno.test('formatValue should correctly format set type', () => {
	const set = new Set([1, 2, 3]);
	const result = formatValue(set);
	assertEquals(result, JSON.stringify(Array.from(set)));
});

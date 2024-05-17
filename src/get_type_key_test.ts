import { assertEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import { getTypeKey } from './get_type_key.ts';

Deno.test('getTypeKey', () => {
	assertEquals(getTypeKey('some-key'), 'some-key-Type');
});

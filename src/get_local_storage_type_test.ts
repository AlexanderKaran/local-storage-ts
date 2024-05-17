import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.224.0/assert/mod.ts";
import { getLocalStorageType } from "./get_local_storage_type.ts";

Deno.test("getLocalStorageType returns correct type for string", () => {
  assertEquals(getLocalStorageType("test"), "string");
});

Deno.test("getLocalStorageType returns correct type for number", () => {
  assertEquals(getLocalStorageType(123), "number");
});

Deno.test("getLocalStorageType returns correct type for boolean", () => {
  assertEquals(getLocalStorageType(true), "boolean");
});

Deno.test("getLocalStorageType returns correct type for bigint", () => {
  assertEquals(getLocalStorageType(BigInt(123)), "bigint");
});

Deno.test("getLocalStorageType returns correct type for symbol", () => {
  assertEquals(getLocalStorageType(Symbol("test")), "symbol");
});

Deno.test("getLocalStorageType returns correct type for undefined", () => {
  assertEquals(getLocalStorageType(undefined), "undefined");
});

Deno.test("getLocalStorageType throws error for function", () => {
  assertThrows(
    () => getLocalStorageType(() => {}),
    Error,
    "Cannot save function to storage"
  );
});

Deno.test("getLocalStorageType returns correct type for date", () => {
  assertEquals(getLocalStorageType(new Date()), "date");
});

Deno.test("getLocalStorageType returns correct type for array", () => {
  assertEquals(getLocalStorageType([1, 2, 3]), "array");
});

Deno.test("getLocalStorageType returns correct type for object", () => {
  assertEquals(getLocalStorageType({ key: "value" }), "object");
});

Deno.test("getLocalStorageType returns correct type for map", () => {
  assertEquals(getLocalStorageType(new Map()), "map");
});

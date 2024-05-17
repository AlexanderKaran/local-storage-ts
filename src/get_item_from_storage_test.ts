import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.110.0/testing/asserts.ts";

import {
  setStringInStorage,
  setNumberInStorage,
  setBooleanInStorage,
  setBigIntInStorage,
  setDateInStorage,
  setArrayInStorage,
  setObjectInStorage,
  setMapInStorage,
} from "./set_item_in_storage.ts";
import {
  getStringFromStorage,
  safeGetStringFromStorage,
  getNumberFromStorage,
  safeGetNumberFromStorage,
  getBooleanFromStorage,
  safeGetBooleanFromStorage,
  getBigIntFromStorage,
  safeGetBigIntFromStorage,
  getDateFromStorage,
  safeGetDateFromStorage,
  getArrayFromStorage,
  safeGetArrayFromStorage,
  getObjectFromStorage,
  safeGetObjectFromStorage,
  getMapFromStorage,
  safeGetMapFromStorage,
} from "./get_item_from_storage.ts";
import { LocalStorageFetchTypeError } from "./errors.ts";
import { removeItemFromStorage } from "./remove_item_from_storage.ts";

Deno.test("Get type string from local storage", () => {
  const key = "string-get-key";
  removeItemFromStorage(key);

  Deno.test(
    "getStringFromStorage should return a string if there is no value",
    () => {
      const fetchedValue = getStringFromStorage(key);
      assertEquals(fetchedValue, null);
    }
  );

  const value = "testValue";
  setStringInStorage(key, value);

  Deno.test(
    "getStringFromStorage should return a string if there is a value in local storage",
    () => {
      const value = getStringFromStorage(key);
      assertEquals(value, value);
    }
  );

  Deno.test(
    "safeGetStringFromStorage should safely get a string from local storage",
    () => {
      const value = safeGetStringFromStorage(key);
      assertEquals(value, { success: true, value });
    }
  );

  removeItemFromStorage(key);
  setNumberInStorage(key, 123);

  Deno.test(
    "getStringFromStorage should throw an error when the value is not a string",
    () => {
      assertThrows(() => getStringFromStorage(key), LocalStorageFetchTypeError);
    }
  );

  Deno.test(
    "safeGetStringFromStorage should return an error result when the value is not a string",
    () => {
      const result = safeGetStringFromStorage("testKey");
      assertEquals(result, {
        success: false,
        error: new LocalStorageFetchTypeError(key, "string", "number"),
      });
    }
  );

  removeItemFromStorage(key);
});

Deno.test("Get type number from local storage", () => {
  const key = "number-get-key";
  removeItemFromStorage(key);

  Deno.test(
    "getNumberFromStorage should return a number if there is no value",
    () => {
      const fetchedValue = getNumberFromStorage(key);
      assertEquals(fetchedValue, null);
    }
  );

  const savedValue = 123;
  setNumberInStorage(key, savedValue);

  Deno.test(
    "getNumberFromStorage should return a number if there is a value in local storage",
    () => {
      const value = getNumberFromStorage(key);
      assertEquals(value, savedValue);
    }
  );

  Deno.test(
    "safeGetNumberFromStorage should safely get a number from local storage",
    () => {
      const value = safeGetNumberFromStorage(key);
      assertEquals(value, { success: true, value: savedValue });
    }
  );

  removeItemFromStorage(key);
  setStringInStorage(key, "testValue");

  Deno.test(
    "getNumberFromStorage should throw an error when the value is not a number",
    () => {
      assertThrows(() => getNumberFromStorage(key), LocalStorageFetchTypeError);
    }
  );

  Deno.test(
    "safeGetNumberFromStorage should return an error result when the value is not a number",
    () => {
      const result = safeGetNumberFromStorage("testKey");
      assertEquals(result, {
        success: false,
        error: new LocalStorageFetchTypeError(key, "number", "string"),
      });
    }
  );

  removeItemFromStorage(key);
});

Deno.test("Get type boolean from local storage", () => {
  const key = "boolean-get-key";
  removeItemFromStorage(key);

  Deno.test(
    "getBooleanFromStorage should return a boolean if there is no value",
    () => {
      const fetchedValue = getBooleanFromStorage(key);
      assertEquals(fetchedValue, null);
    }
  );

  console.log(localStorage);
  const value = true;
  setBooleanInStorage(key, value);

  Deno.test(
    "getBooleanFromStorage should return a boolean if there is a value in local storage",
    () => {
      const value = getBooleanFromStorage(key);
      assertEquals(value, value);
    }
  );

  Deno.test(
    "safeGetBooleanFromStorage should safely get a boolean from local storage",
    () => {
      const value = safeGetBooleanFromStorage(key);
      assertEquals(value, { success: true, value });
    }
  );

  removeItemFromStorage(key);
  setStringInStorage(key, "testValue");

  Deno.test(
    "getBooleanFromStorage should throw an error when the value is not a boolean",
    () => {
      assertThrows(
        () => getBooleanFromStorage(key),
        LocalStorageFetchTypeError
      );
    }
  );

  Deno.test(
    "safeGetBooleanFromStorage should return an error result when the value is not a boolean",
    () => {
      const result = safeGetBooleanFromStorage("testKey");
      assertEquals(result, {
        success: false,
        error: new LocalStorageFetchTypeError(key, "boolean", "string"),
      });
    }
  );
});

Deno.test("Get type bigint from local storage", () => {
  const key = "bigint";
  removeItemFromStorage(key);

  Deno.test(
    "getBigIntFromStorage should return a bigint if there is no value",
    () => {
      const fetchedValue = getBigIntFromStorage(key);
      assertEquals(fetchedValue, null);
    }
  );

  const value = BigInt(123);
  setBigIntInStorage(key, value);

  Deno.test(
    "getBigIntFromStorage should return a bigint if there is a value in local storage",
    () => {
      const value = getBigIntFromStorage(key);
      assertEquals(value, value);
    }
  );

  Deno.test(
    "safeGetBigIntFromStorage should safely get a bigint from local storage",
    () => {
      const value = safeGetBigIntFromStorage(key);
      assertEquals(value, { success: true, value });
    }
  );

  removeItemFromStorage(key);
  setStringInStorage(key, "testValue");

  Deno.test(
    "getBigIntFromStorage should throw an error when the value is not a bigint",
    () => {
      assertThrows(() => getBigIntFromStorage(key), LocalStorageFetchTypeError);
    }
  );

  Deno.test(
    "safeGetBigIntFromStorage should return an error result when the value is not a bigint",
    () => {
      const result = safeGetBigIntFromStorage("testKey");
      assertEquals(result, {
        success: false,
        error: new LocalStorageFetchTypeError(key, "bigint", "string"),
      });
    }
  );
});

Deno.test("Get type date from local storage", () => {
  const key = "date-get-key";
  removeItemFromStorage(key);

  Deno.test(
    "getDateFromStorage should return a date if there is no value",
    () => {
      const fetchedValue = getDateFromStorage(key);
      assertEquals(fetchedValue, null);
    }
  );

  const value = new Date();
  setDateInStorage(key, value);

  Deno.test(
    "getDateFromStorage should return a date if there is a value in local storage",
    () => {
      const value = getDateFromStorage(key);
      assertEquals(value, value);
    }
  );

  Deno.test(
    "safeGetDateFromStorage should safely get a date from local storage",
    () => {
      const value = safeGetDateFromStorage(key);
      assertEquals(value, { success: true, value });
    }
  );

  removeItemFromStorage(key);
  setStringInStorage(key, "testValue");

  Deno.test(
    "getDateFromStorage should throw an error when the value is not a date",
    () => {
      assertThrows(() => getDateFromStorage(key), LocalStorageFetchTypeError);
    }
  );

  Deno.test(
    "safeGetDateFromStorage should return an error result when the value is not a date",
    () => {
      const result = safeGetDateFromStorage("testKey");
      assertEquals(result, {
        success: false,
        error: new LocalStorageFetchTypeError(key, "date", "string"),
      });
    }
  );

  removeItemFromStorage(key);
});

Deno.test("Get type array from local storage", () => {
  const key = "array-get-key";
  removeItemFromStorage(key);

  Deno.test(
    "getArrayFromStorage should return an array if there is no value",
    () => {
      const fetchedValue = getArrayFromStorage(key);
      assertEquals(fetchedValue, null);
    }
  );

  const value = ["testValue"];
  setArrayInStorage(key, value);

  Deno.test(
    "getArrayFromStorage should return an array if there is a value in local storage",
    () => {
      const value = getArrayFromStorage(key);
      assertEquals(value, value);
    }
  );

  Deno.test(
    "safeGetArrayFromStorage should safely get an array from local storage",
    () => {
      const value = safeGetArrayFromStorage(key);
      assertEquals(value, { success: true, value });
    }
  );

  removeItemFromStorage(key);
  setStringInStorage(key, "testValue");

  Deno.test(
    "getArrayFromStorage should throw an error when the value is not an array",
    () => {
      assertThrows(() => getArrayFromStorage(key), LocalStorageFetchTypeError);
    }
  );

  Deno.test(
    "safeGetArrayFromStorage should return an error result when the value is not an array",
    () => {
      const result = safeGetArrayFromStorage("testKey");
      assertEquals(result, {
        success: false,
        error: new LocalStorageFetchTypeError(key, "array", "string"),
      });
    }
  );
});

Deno.test("Get type object from local storage", () => {
  const key = "object-get-key";
  removeItemFromStorage(key);

  Deno.test(
    "getObjectFromStorage should return an object if there is no value",
    () => {
      const fetchedValue = getObjectFromStorage(key);
      assertEquals(fetchedValue, null);
    }
  );

  const value = { testKey: "testValue" };
  setObjectInStorage(key, value);

  Deno.test(
    "getObjectFromStorage should return an object if there is a value in local storage",
    () => {
      const value = getObjectFromStorage(key);
      assertEquals(value, value);
    }
  );

  Deno.test(
    "safeGetObjectFromStorage should safely get an object from local storage",
    () => {
      const value = safeGetObjectFromStorage(key);
      assertEquals(value, { success: true, value });
    }
  );

  removeItemFromStorage(key);
  setStringInStorage(key, "testValue");

  Deno.test(
    "getObjectFromStorage should throw an error when the value is not an object",
    () => {
      assertThrows(() => getObjectFromStorage(key), LocalStorageFetchTypeError);
    }
  );

  Deno.test(
    "safeGetObjectFromStorage should return an error result when the value is not an object",
    () => {
      const result = safeGetObjectFromStorage("testKey");
      assertEquals(result, {
        success: false,
        error: new LocalStorageFetchTypeError(key, "object", "string"),
      });
    }
  );
});

Deno.test("Get type map from local storage", () => {
  const key = "map-get-key";
  removeItemFromStorage(key);

  Deno.test("getMapFromStorage should return null if there is no value", () => {
    const fetchedValue = getMapFromStorage(key);
    assertEquals(fetchedValue, null);
  });

  const value = new Map();
  value.set("testKey", "testValue");
  setMapInStorage(key, value);

  Deno.test(
    "getMapFromStorage should return a map if there is a value in local storage",
    () => {
      const fetchedValue = getMapFromStorage(key);
      assertEquals(fetchedValue, value);
    }
  );

  Deno.test(
    "safeGetMapFromStorage should safely get a map from local storage",
    () => {
      const result = safeGetMapFromStorage(key);
      assertEquals(result, { success: true, value });
    }
  );

  removeItemFromStorage(key);
  setStringInStorage(key, "testValue");

  Deno.test(
    "getMapFromStorage should throw an error when the value is not a map",
    () => {
      assertThrows(() => getMapFromStorage(key), LocalStorageFetchTypeError);
    }
  );

  Deno.test(
    "safeGetMapFromStorage should return an error result when the value is not a map",
    () => {
      const result = safeGetMapFromStorage(key);
      assertEquals(result, {
        success: false,
        error: new LocalStorageFetchTypeError(key, "map", "string"),
      });
    }
  );
});

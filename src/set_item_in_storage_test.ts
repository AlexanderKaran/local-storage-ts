import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.110.0/testing/asserts.ts";

import {
  setStringInStorage,
  safeSetStringInStorage,
  setNumberInStorage,
  safeSetNumberInStorage,
  setBooleanInStorage,
  safeSetBooleanInStorage,
  setBigIntInStorage,
  safeSetBigIntInStorage,
  setDateInStorage,
  safeSetDateInStorage,
  setArrayInStorage,
  safeSetArrayInStorage,
  setObjectInStorage,
  safeSetObjectInStorage,
} from "./set_item_in_storage.ts";
import { LocalStorageInsertTypeError } from "./errors.ts";
import { getTypeKey } from "./get_type_key.ts";
import { removeItemFromStorage } from "./remove_item_from_storage.ts";

Deno.test("Set type string in storage", () => {
  const key = "string-set-key";
  removeItemFromStorage(key);

  Deno.test("setStringInStorage should set a string in local storage", () => {
    const value = "testValue";
    setStringInStorage(key, value);
    assertEquals(localStorage.getItem(key), value);

    const typeKey = localStorage.getItem(getTypeKey(key));
    assertEquals(typeKey, "string");
  });

  Deno.test(
    "safeSetStringInStorage should safely set a string in local storage",
    () => {
      const value = "newTestValue";
      const result = safeSetStringInStorage("testKey", value);
      assertEquals(result.success, true);
      assertEquals(localStorage.getItem("testKey"), value);

      const typeKey = localStorage.getItem(getTypeKey("testKey"));
      assertEquals(typeKey, "string");
    }
  );

  Deno.test(
    "setStringInStorage should throw an error when the value is not a string",
    () => {
      assertThrows(
        // @ts-expect-error Testing invalid input
        () => setStringInStorage("testKey", 123),
        LocalStorageInsertTypeError
      );
    }
  );

  Deno.test(
    "safeSetStringInStorage should return an error result when the value is not a string",
    () => {
      // @ts-expect-error Testing invalid input
      const result = safeSetStringInStorage("testKey", 123);
      assertEquals(result, {
        success: false,
        error: new LocalStorageInsertTypeError("testKey", "string", "number"),
      });
    }
  );

  removeItemFromStorage(key);
});

Deno.test("Set type number in storage", () => {
  const key = "number-set-key";
  removeItemFromStorage(key);

  Deno.test("setNumberInStorage should set a number in local storage", () => {
    const value = 123;
    setNumberInStorage(key, value);
    assertEquals(localStorage.getItem(key), value.toString());

    const typeKey = localStorage.getItem(getTypeKey(key));
    assertEquals(typeKey, "number");
  });

  Deno.test(
    "safeSetNumberInStorage should safely set a number in local storage",
    () => {
      const value = 456;
      const result = safeSetNumberInStorage(key, value);
      assertEquals(result.success, true);
      assertEquals(localStorage.getItem(key), value.toString());

      const typeKey = localStorage.getItem(getTypeKey(key));
      assertEquals(typeKey, "number");
    }
  );

  Deno.test(
    "setNumberInStorage should throw an error when the value is not a number",
    () => {
      assertThrows(
        // @ts-expect-error Testing invalid input
        () => setNumberInStorage(key, "not a number"),
        LocalStorageInsertTypeError
      );
    }
  );

  Deno.test(
    "safeSetNumberInStorage should return an error result when the value is not a number",
    () => {
      // @ts-expect-error Testing invalid input
      const result = safeSetNumberInStorage(key, "not a number");
      assertEquals(result, {
        success: false,
        error: new LocalStorageInsertTypeError(key, "number", "string"),
      });
    }
  );

  removeItemFromStorage(key);
});

Deno.test("Set type boolean in storage", () => {
  const key = "boolean-set-key";
  removeItemFromStorage(key);

  Deno.test("setBooleanInStorage should set a boolean in local storage", () => {
    const value = true;
    setBooleanInStorage(key, value);
    assertEquals(localStorage.getItem(key), value.toString());

    const typeKey = localStorage.getItem(getTypeKey(key));
    assertEquals(typeKey, "boolean");
  });

  Deno.test(
    "safeSetBooleanInStorage should safely set a boolean in local storage",
    () => {
      const value = false;
      const result = safeSetBooleanInStorage(key, value);
      assertEquals(result.success, true);
      assertEquals(localStorage.getItem(key), value.toString());

      const typeKey = localStorage.getItem(getTypeKey(key));
      assertEquals(typeKey, "boolean");
    }
  );

  Deno.test(
    "setBooleanInStorage should throw an error when the value is not a boolean",
    () => {
      assertThrows(
        // @ts-expect-error Testing invalid input
        () => setBooleanInStorage(key, "not a boolean"),
        LocalStorageInsertTypeError
      );
    }
  );

  Deno.test(
    "safeSetBooleanInStorage should return an error result when the value is not a boolean",
    () => {
      // @ts-expect-error Testing invalid input
      const result = safeSetBooleanInStorage(key, "not a boolean");
      assertEquals(result, {
        success: false,
        error: new LocalStorageInsertTypeError(key, "boolean", "string"),
      });
    }
  );

  removeItemFromStorage(key);
});

Deno.test("Set type bigint in storage", () => {
  const key = "bigint-set-key";
  removeItemFromStorage(key);

  Deno.test("setBigIntInStorage should set a bigint in local storage", () => {
    const value = BigInt(123);
    setBigIntInStorage(key, value);
    assertEquals(localStorage.getItem(key), value.toString());

    const typeKey = localStorage.getItem(getTypeKey(key));
    assertEquals(typeKey, "bigint");
  });

  Deno.test(
    "safeSetBigIntInStorage should safely set a bigint in local storage",
    () => {
      const value = BigInt(456);
      const result = safeSetBigIntInStorage(key, value);
      assertEquals(result.success, true);
      assertEquals(localStorage.getItem(key), value.toString());

      const typeKey = localStorage.getItem(getTypeKey(key));
      assertEquals(typeKey, "bigint");
    }
  );

  Deno.test(
    "setBigIntInStorage should throw an error when the value is not a bigint",
    () => {
      assertThrows(
        // @ts-expect-error Testing invalid input
        () => setBigIntInStorage(key, "not a bigint"),
        LocalStorageInsertTypeError
      );
    }
  );

  Deno.test(
    "safeSetBigIntInStorage should return an error result when the value is not a bigint",
    () => {
      // @ts-expect-error Testing invalid input
      const result = safeSetBigIntInStorage(key, "not a bigint");
      assertEquals(result, {
        success: false,
        error: new LocalStorageInsertTypeError(key, "bigint", "string"),
      });
    }
  );

  removeItemFromStorage(key);
});

Deno.test("Set type date in storage", () => {
  const key = "date-set-key";
  removeItemFromStorage(key);

  Deno.test("setDateInStorage should set a date in local storage", () => {
    const value = new Date();
    setDateInStorage(key, value);
    assertEquals(localStorage.getItem(key), value.toISOString());

    const typeKey = localStorage.getItem(getTypeKey(key));
    assertEquals(typeKey, "date");
  });

  Deno.test(
    "safeSetDateInStorage should safely set a date in local storage",
    () => {
      const value = new Date();
      const result = safeSetDateInStorage(key, value);
      assertEquals(result.success, true);
      assertEquals(localStorage.getItem(key), value.toISOString());

      const typeKey = localStorage.getItem(getTypeKey(key));
      assertEquals(typeKey, "date");
    }
  );

  Deno.test(
    "setDateInStorage should throw an error when the value is not a date",
    () => {
      assertThrows(
        // @ts-expect-error Testing invalid input
        () => setDateInStorage(key, "not a date"),
        LocalStorageInsertTypeError
      );
    }
  );

  Deno.test(
    "safeSetDateInStorage should return an error result when the value is not a date",
    () => {
      // @ts-expect-error Testing invalid input
      const result = safeSetDateInStorage(key, "not a date");
      assertEquals(result, {
        success: false,
        error: new LocalStorageInsertTypeError(key, "date", "string"),
      });
    }
  );

  removeItemFromStorage(key);
});

Deno.test("Set type array in storage", () => {
  const key = "array-set-key";
  removeItemFromStorage(key);

  Deno.test("setArrayInStorage should set an array in local storage", () => {
    const value = [1, 2, 3];
    setArrayInStorage(key, value);
    assertEquals(localStorage.getItem(key), JSON.stringify(value));

    const typeKey = localStorage.getItem(getTypeKey(key));
    assertEquals(typeKey, "array");
  });

  Deno.test(
    "safeSetArrayInStorage should safely set an array in local storage",
    () => {
      const value = [4, 5, 6];
      const result = safeSetArrayInStorage(key, value);
      assertEquals(result.success, true);
      assertEquals(localStorage.getItem(key), JSON.stringify(value));

      const typeKey = localStorage.getItem(getTypeKey(key));
      assertEquals(typeKey, "array");
    }
  );

  Deno.test(
    "setArrayInStorage should throw an error when the value is not an array",
    () => {
      assertThrows(
        // @ts-expect-error Testing invalid input
        () => setArrayInStorage(key, "not an array"),
        LocalStorageInsertTypeError
      );
    }
  );

  Deno.test(
    "safeSetArrayInStorage should return an error result when the value is not an array",
    () => {
      // @ts-expect-error Testing invalid input
      const result = safeSetArrayInStorage(key, "not an array");
      assertEquals(result, {
        success: false,
        error: new LocalStorageInsertTypeError(key, "array", "string"),
      });
    }
  );

  removeItemFromStorage(key);
});

Deno.test("Set type object in storage", () => {
  const key = "object-set-key";
  removeItemFromStorage(key);

  Deno.test("setObjectInStorage should set an object in local storage", () => {
    const value = { a: 1, b: 2, c: 3 };
    setObjectInStorage(key, value);
    assertEquals(localStorage.getItem(key), JSON.stringify(value));

    const typeKey = localStorage.getItem(getTypeKey(key));
    assertEquals(typeKey, "object");
  });

  Deno.test(
    "safeSetObjectInStorage should safely set an object in local storage",
    () => {
      const value = { x: 4, y: 5, z: 6 };
      const result = safeSetObjectInStorage(key, value);
      assertEquals(result.success, true);
      assertEquals(localStorage.getItem(key), JSON.stringify(value));

      const typeKey = localStorage.getItem(getTypeKey(key));
      assertEquals(typeKey, "object");
    }
  );

  Deno.test(
    "setObjectInStorage should throw an error when the value is not an object",
    () => {
      assertThrows(
        // @ts-expect-error Testing invalid input
        () => setObjectInStorage(key, "not an object"),
        LocalStorageInsertTypeError
      );
    }
  );

  Deno.test(
    "safeSetObjectInStorage should return an error result when the value is not an object",
    () => {
      // @ts-expect-error Testing invalid input
      const result = safeSetObjectInStorage(key, "not an object");
      assertEquals(result, {
        success: false,
        error: new LocalStorageInsertTypeError(key, "object", "string"),
      });
    }
  );

  removeItemFromStorage(key);
});

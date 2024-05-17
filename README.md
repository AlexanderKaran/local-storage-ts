# Type Safe Local Storage

This is a simple library that allows you to store and retrieve data from local storage in a type safe way. It uses the `localStorage` API under the hood. It works just like the `localStorage` API returning a value or null if the key does not exist. The difference is that it provides type safe functions for storing and retrieving data.

## Installation

You can install from the JSRegistry by running:

```bash
# deno
deno add @alexander-karan/local-storage-ts

# npm (one of the below, depending on your package manager)
npx jsr add @alexander-karan/local-storage-ts
yarn dlx jsr add @alexander-karan/local-storage-ts
pnpm dlx jsr add @alexander-karan/local-storage-ts
bunx jsr add @alexander-karan/local-storage-ts
```

Or you can install from npm registry by running:

```
npm i local-storage-typescript
```

## Usage

Type Safe Local Storage is very simple to use. You can store and retrieve data in a type safe way using the multiple set and get functions based on the type of data you want to store.

For example, to store a string in local storage, you can use the `setStringInStorage` function:

```typescript
import { setStringInStorage, getStringFromStorage } from 'type-safe-local-storage';

const key = 'myString';
const value = 'Hello, World!';
setStringInStorage(key, value);

const retrievedValue = getStringFromStorage(key);
console.log(retrievedValue); // Hello, World!
```

Now I know what your thinking, why not just use the `localStorage` API directly? Well, the `localStorage` API only allows you to store strings. This library allows you to store and retrieve data in a type safe way. For example, you can store and retrieve numbers like so:

```typescript
import { setNumberInStorage, getNumberFromStorage } from 'type-safe-local-storage';

const key = 'myNumber';
const value = 42;

setNumberInStorage(key, value);

const retrievedValue = getNumberFromStorage(key);
console.log(retrievedValue); // 42
```

Maybe you want to store and retrieve Dates you can do that too:

```typescript
import { setDateInStorage, getDateFromStorage } from 'type-safe-local-storage';

const key = 'myDate';
const value = new Date(2021, 1, 1)

setDateInStorage(key, value);

const retrievedValue = getDateFromStorage(key);
console.log(retrievedValue); // 2021-01-01T00:00:00.000Z
```

You can store and retrieve any type of data you want using this library. It is type safe and easy to use. See type support for a [list of all the types you can store and retrieve](#supported-types) with details on what is happening under the hood. 

## Safe Parsing 

All set and get functions can throw an error if the data you are trying to store or retrieve is not of the correct type, see [Runtime Type Checking](#runtime-type-checking) for more details. However you can also use the safe parsing functions to parse data safely. For example, you can use the `safeSetStringInStorage` and `safeGetStringFromStorage` functions to safely store and retrieve strings:

```typescript
import { safeSetStringInStorage, safeGetStringFromStorage } from 'type-safe-local-storage';

const key = 'myString';
const value = 42;

const {success: false, error: LocalStorageError } = safeSetStringInStorage(key, value);
console.log(LocalStorageError); 
// Error: Expected type of data to be inserted into local storage to be string but got number for key myString

const {success: true, data: 'Hello, World!'} = safeGetStringFromStorage(key);
```

## Runtime Type Checking

Type Safe Local Storage also provides runtime type checking to ensure that the data you are storing and retrieving is of the correct type. If you try to store or retrieve data of the wrong type, an error will be thrown. What this means is that if you try to store a number as a string, an error will be thrown. Or you try to save a string to key that is expecting a number, an error will be thrown.

## Supported Types

Type Safe Local Storage supports the following types:

- String
- Number
- Boolean
- Date // Stored as a ISO string under the hood
- Object // Stored as a JSON string under the hood
- Array // Stored as a JSON string under the hood

## Gotcha's

- The `localStorage` API only allows you to store strings. This library allows you to store and retrieve data in a type safe way. However, the data is stored as a string under the hood. This means that when you retrieve the data, you will need to parse it back to the original type. This library does this for you under the hood. For objects and arrays, it uses `JSON.parse` and `JSON.stringify` to store and retrieve the data. For Dates, it uses the `Date` constructor to parse the date string back to a date object using ISO string format. Keep this in mind when using this library.

- To delete a key from local storage, you must use the provided `removeItemFromStorage` function. This is because this library keeps track of the types of data stored in local storage. If you delete a key using the `localStorage` API directly, the type information will be lost or cause a type mismatch error when trying to retrieve the data.
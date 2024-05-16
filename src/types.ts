export type Success<T> = {
  success: true;
  value: T;
};

export type Failure<E> = {
  success: false;
  error: E;
};

export type Result<T, E> = Success<T> | Failure<E>;

export type LocalStoreType =
  | "string"
  | "number"
  | "boolean"
  | "bigint"
  | "symbol"
  | "undefined"
  | "object"
  | "array"
  | "date";

import type { TypeErrorArgs, Values } from "./types";

export default function strpolate(s: string, values: Values): string {
  return s.replace(/%(\w*)\{(\w+)\}/g, (_, type, key) => {
    const value = values[key];
    const expectedType = typeToString(type);
    const receivedType = typeof value;

    if (value === null || value === undefined) {
      throw typeError({ key, expected: expectedType, received: receivedType });
    }

    if (
      type === "" ||
      ((type === "s" || type === "string") && isString(value)) ||
      ((type === "n" || type === "number") && isNumber(value)) ||
      ((type === "b" || type === "boolean") && isBoolean(value))
    ) {
      return String(value);
    }

    throw typeError({ key, expected: expectedType, received: receivedType });
  });
}

function isString(x: unknown): x is string {
  return typeof x === "string";
}

function isNumber(x: unknown): x is number {
  return typeof x === "number";
}

function isBoolean(x: unknown): x is boolean {
  return typeof x === "boolean";
}

function typeToString(type: string): string {
  switch (type) {
    case "s":
    case "string":
      return "string";
    case "n":
    case "number":
      return "number";
    case "b":
    case "boolean":
      return "boolean";
    default:
      return "unknown";
  }
}

function typeError({ key, expected, received }: TypeErrorArgs) {
  const message = `Invalid value for '${key}'. Expected ${expected}, but got ${received}`;

  return new Error(message);
}

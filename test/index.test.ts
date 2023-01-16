import { describe, expect, it } from "vitest";

import strpolate from "../src/index";

describe("strpolate", () => {
  it("replaces placeholders in a string with the corresponding values in an object", () => {
    const values = { message: "Hello, world!", count: 5, enabled: true };

    const s =
      "The value of message is %s{message}, the value of count is %n{count}, and the value of enabled is %b{enabled}";
    const s2 =
      "The value of message is %string{message}, the value of count is %number{count}, and the value of enabled is %boolean{enabled}";
    const expected =
      "The value of message is Hello, world!, the value of count is 5, and the value of enabled is true";

    expect(strpolate(s, values)).toBe(expected);

    expect(strpolate(s2, values)).toBe(expected);
  });

  it("throws an error if a value is not provided for a placeholder", () => {
    const values = { message: "Hello, world!" };

    const s =
      "The value of message is %s{message}, and the value of count is %n{count}";
    const s2 =
      "The value of message is %string{message}, and the value of count is %number{count}";
    const expectedErrorMessage =
      "Invalid value for 'count'. Expected number, but got undefined";

    expect(() => strpolate(s, values)).toThrowError(expectedErrorMessage);
    expect(() => strpolate(s2, values)).toThrowError(expectedErrorMessage);
  });

  it("throws an error if a value is null for a placeholder", () => {
    const values = { message: "Hello, world!", count: null };

    const s =
      "The value of message is %s{message}, and the value of count is %n{count}";
    const s2 =
      "The value of message is %string{message}, and the value of count is %number{count}";
    const expectedErrorMessage =
      "Invalid value for 'count'. Expected number, but got object";

    expect(() => strpolate(s, values)).toThrowError(expectedErrorMessage);
    expect(() => strpolate(s2, values)).toThrowError(expectedErrorMessage);
  });

  it("throws an error if a value is undefined for a placeholder", () => {
    const values = { message: "Hello, world!", count: undefined };

    const s =
      "The value of message is %s{message}, and the value of count is %n{count}";
    const s2 =
      "The value of message is %string{message}, and the value of count is %number{count}";
    const expectedErrorMessage =
      "Invalid value for 'count'. Expected number, but got undefined";

    expect(() => strpolate(s, values)).toThrowError(expectedErrorMessage);
    expect(() => strpolate(s2, values)).toThrowError(expectedErrorMessage);
  });

  it("throws an error if a value has the wrong type for a placeholder", () => {
    const values = { message: "Hello, world!", count: "5" };

    const s =
      "The value of message is %s{message}, and the value of count is %n{count}";
    const s2 =
      "The value of message is %string{message}, and the value of count is %number{count}";
    const expectedErrorMessage =
      "Invalid value for 'count'. Expected number, but got string";

    expect(() => strpolate(s, values)).toThrowError(expectedErrorMessage);
    expect(() => strpolate(s2, values)).toThrowError(expectedErrorMessage);
  });

  it("throws an error if a placeholder has an unknown type specifier", () => {
    const values = { count: 5 };

    const s =
      "The value of message is %{message}, and the value of count is %number{count}";
    const s2 =
      "The value of message is %{message}, and the value of count is %n{count}";
    const expectedErrorMessage =
      "Invalid value for 'message'. Expected unknown, but got undefined";

    expect(() => strpolate(s, values)).toThrowError(expectedErrorMessage);
    expect(() => strpolate(s2, values)).toThrowError(expectedErrorMessage);
  });
});

# Strpolate

![Minified size](https://img.shields.io/bundlephobia/min/strpolate) ![Test coverage](https://img.shields.io/codecov/c/github/kevinhermawan/strpolate) ![Monthly download](https://img.shields.io/npm/dm/strpolate)

Strpolate is a JavaScript library that offers fast string interpolation by replacing placeholders in the string with corresponding values from an object. It also includes type validation to ensure that the values being inserted match the expected data type of the placeholder.

## Features

- Fast string interpolation
- Built-in type validation
- Supports Deno via NPM
- Zero dependencies

## Installation

To install `strpolate`, run the following command:

**NPM**

```
npm install strpolate
```

**Yarn**

```
yarn add strpolate
```

**pnpm**

```
pnpm add strpolate
```

## Usage

You can use the following type specifiers in the placeholders: `%s` or `%string` for string values, `%n` or `%number` for number values, and `%b` or `%boolean` for boolean values. If no type specifier is provided, the default type is assumed to be `string`.

```ts
import strpolate from "strpolate";
// import strpolate from "npm:strpolate"; // (for Deno)

const result = strpolate(
  "The value of message is %{message}, the value of count is %number{count}, and the value of enabled is %boolean{enabled}",
  { message: "Hello, world!", count: 5, enabled: true }
);

// result is "The value of message is Hello, world!, the value of count is 5, and the value of enabled is true"
```

If a placeholder is missing a corresponding value in the `values` object, or if the value has the wrong type, `strpolate` will throw an error.

```ts
import strpolate from "strpolate";
// import strpolate from "npm:strpolate"; // (for Deno)

// Throws an error because the 'count' placeholder is missing a corresponding value in the 'values' object
strpolate(
  "The value of message is %{message}, and the value of count is %number{count}",
  { message: "Hello, world!" }
);

// Throws an error because the value for the 'count' placeholder is a string, but the placeholder expects a number
strpolate(
  "The value of message is %{message}, and the value of count is %number{count}",
  { message: "Hello, world!", count: "5" }
);
```

## Syntax

```ts
strpolate(string: string, values: Record<string, string | number | boolean | undefined>): string
```

## License

[MIT License](/LICENSE)

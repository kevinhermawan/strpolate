export type Values = Record<
  string,
  string | number | boolean | null | undefined
>;

export type TypeErrorArgs = {
  key: string;
  expected: string;
  received: string;
};

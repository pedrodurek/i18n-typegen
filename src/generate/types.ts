export type Resource =
  | string
  | string[]
  | {
      [key: string]: Resource;
    };

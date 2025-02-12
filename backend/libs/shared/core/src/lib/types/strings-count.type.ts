export const STRINGS_COUNT_VALUES = [4, 6, 7, 12] as const;

export type StringsCount = typeof STRINGS_COUNT_VALUES[number];

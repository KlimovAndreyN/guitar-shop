export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const toMoneyRuLocate = (digit: number): string => digit.toLocaleString('ru-RU');

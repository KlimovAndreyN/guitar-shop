export function getRandomNumber(min: number, max: number, numAfterDigit = 0) {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomItem<T>(items: T[]): T {
  return items[getRandomNumber(0, items.length - 1)];
}

export function getRandomStringEnumValue<T extends object>(value: T): keyof T {
  const objValues = Object.values(value);

  return getRandomItem(objValues);
}

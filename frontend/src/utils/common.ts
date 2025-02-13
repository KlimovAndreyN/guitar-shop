function upFirstLetter(text: string): string {
  return text[0].toUpperCase() + text.slice(1);
}

function addPluralEnding(word: string, count: number): string {
  return `${word}${(count === 1) ? '' : 's'}`;
}

export { upFirstLetter, addPluralEnding };

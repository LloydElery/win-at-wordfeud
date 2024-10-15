import { normalizeWord } from "~/server/api/wordSearchService";

export const letterValues: Record<string, number> = {
  a: 1,
  b: 3,
  c: 8,
  d: 1,
  e: 1,
  f: 3,
  g: 2,
  h: 3,
  i: 1,
  j: 7,
  k: 3,
  l: 2,
  m: 3,
  n: 1,
  o: 2,
  p: 4,
  q: 10,
  r: 1,
  s: 1,
  t: 1,
  u: 4,
  v: 3,
  w: 8,
  x: 8,
  y: 7,
  z: 8,
  å: 4,
  ä: 4,
  ö: 4,
  _: 1,
};

export function calculateWordValue(word: string): number {
  const normalizedWord = normalizeWord(word);
  return normalizedWord
    .split("")
    .reduce((total, char) => total + (letterValues[char] || 0), 0);
}

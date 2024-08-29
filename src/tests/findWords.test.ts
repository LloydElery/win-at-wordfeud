// __tests__/findWords.test.ts
import { findWords } from "~/utils/wordUtils";

const wordList = [
  'fusk',
  'fuskades',
  'fuskade',
  'skadad',
  'svar',
  'en',
  'al',
  'd',
  'dad',
  'ad'
];

test('findWords with letters "f", "u", "s", "k"', () => {
  const letters = ['f', 'u', 's', 'k'];
  const expected = ['fusk'];
  expect(findWords(letters, wordList)).toEqual(expected);
});

test('findWords with letters "f", "u", "s", "k", "a"', () => {
  const letters = ['f', 'u', 's', 'k', 'a'];
  const expected = ['fusk', 'fuskades'];
  expect(findWords(letters, wordList)).toEqual(expected);
});

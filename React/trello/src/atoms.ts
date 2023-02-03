import { atom } from 'recoil';

export const todoState = atom({
  key: 'toto',
  default: ['a', 'b', 'c', 'd', 'e', 'f'],
});

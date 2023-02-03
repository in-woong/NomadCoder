import { atom } from 'recoil';

export interface ITodoState {
  [key: string]: string[];
}

export const todoState = atom<ITodoState>({
  key: 'toto',
  default: {
    'To Do': ['a', 'b'],
    doing: ['c', 'd'],
    done: ['e', 'f'],
    'Do Later': ['g'],
  },
});

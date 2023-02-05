import { atom } from 'recoil';

export interface Todo {
  id: number;
  text: string;
}
export interface ITodoState {
  [key: string]: Todo[];
}

export const todoState = atom<ITodoState>({
  key: 'todo',
  default: {
    'To Do': [],
    doing: [],
    done: [],
  },
});

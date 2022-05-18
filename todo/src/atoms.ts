import { useResolvedPath } from 'react-router-dom';
import { atom, selector } from 'recoil';
const groupName = ['one', 'two', 'three', 'four', 'five', 'six'];
export const getUsers = (value: string) => {};
const users = {
  one: [
    'one',
    'one',
    'one',
    'one',
    'one',
    'one',
    'one',
    'one',
    'one',
    'one',
    'one',
    'one',
  ],
  two: [
    'two',
    'two',
    'two',
    'two',
    'two',
    'two',
    'two',
    'two',
    'two',
    'two',
    'two',
    'two',
  ],
  three: [
    'three',
    'three',
    'three',
    'three',
    'three',
    'three',
    'three',
    'three',
    'three',
    'three',
    'three',
    'three',
  ],
  four: [
    'four',
    'four',
    'four',
    'four',
    'four',
    'four',
    'four',
    'four',
    'four',
    'four',
    'four',
    'four',
  ],
  five: [
    'five',
    'five',
    'five',
    'five',
    'five',
    'five',
    'five',
    'five',
    'five',
    'five',
    'five',
    'five',
  ],
};
export const usersState = atom<string[]>({
  key: 'users',
  default: [...users.one],
});

export const groupsState = atom({
  key: 'groups',
  default: ['one', 'two', 'three', 'four', 'five', 'six', 'seven'],
});

export const usersSelector = selector<string[]>({
  key: 'filteredUsers',
  get: ({ get }) => get(usersState),
  set: ({ set }, newVaule) => {
    set(usersState, ['inwoong', 'joonyoung', 'taewoong']);
  },
});

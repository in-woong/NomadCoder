import { atom, selector } from 'recoil';

export enum Categories{
  "TO_DO",
  "DOING",
  "DONE",
}

export interface IToDo {
  id: number;
  text: string;
  category: Categories;
}

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
});

export const toDoFilterState = atom<Categories>({
  key: 'toDoFilterState',
  default: Categories.TO_DO,
});

export const filteredToDoState = selector({
  key: 'filteredToDoState',
  get: ({ get }) => {
    const filter = get(toDoFilterState);
    const toDos = get(toDoState);
    return toDos.filter((toDo) => toDo.category === filter);
  },
});

import { atom, selector } from 'recoil';

export const minuteState = atom({
  key: 'minues',
  default: 0,
});

export const hourSelector = selector({
  key: 'hours',
  get: ({ get }) => {
    const minutes = get(minuteState);
    return minutes / 60;
  },
});

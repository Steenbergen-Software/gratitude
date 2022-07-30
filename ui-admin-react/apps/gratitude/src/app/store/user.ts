import { atom, selector } from 'recoil';

export interface User {
  username: string;
  fullname: string;
  email: string;
}

export const userAtom = atom<User | null>({
  key: 'userAtom',
  default: null,
});

export const isAuthenticatedState = selector({
  key: 'isAuthenticatedState',
  get: ({ get }) => {
    const user = get(userAtom);
    return user != null;
  },
});

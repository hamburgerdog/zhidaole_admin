import {
  atom,
} from 'recoil';

const initialState = {
  name: 'No User',
  avatar: 'https://avatars.githubusercontent.com/u/100409110?v=4',
};

export const userState = atom({
  key: 'userState',
  default: initialState,
});
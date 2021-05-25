import { atom } from 'recoil';
import { ILoadingScreenAtom } from './loading-screen.interface';

export const loadingScreenState = atom<ILoadingScreenAtom>({
  key: 'loadingScreenState',
  default: {
    visible: false,
    info_text: '',
  },
});

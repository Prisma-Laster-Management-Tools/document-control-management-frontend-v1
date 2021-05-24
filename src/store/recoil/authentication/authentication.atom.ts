import { atom } from 'recoil';
import { IAuthenticationState } from './authentication.interface';

export const authenticationState = atom<IAuthenticationState>({
  key: 'authenticationState',
  default: {
    isAuthenticated: false,
    userData: null,
  },
});

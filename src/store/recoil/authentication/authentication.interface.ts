export interface ITokenCredential {
  email: string;
  exp: number;
}

export interface IAuthenticationState {
  isAuthenticated: boolean;
  userData: ITokenCredential | null;
}

export interface ITokenCredential {
  email: string;
  exp: number;
  iat: number;
}

export interface IAuthenticationState {
  isAuthenticated: boolean;
  userData: ITokenCredential | null;
}

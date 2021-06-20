export interface ITokenCredential {
    email: string;
    firstname: string;
    lastname: string;
    position: string;
    role: string;
    exp: number;
    iat: number;
}

export interface IAuthenticationState {
    isAuthenticated: boolean;
    userData: ITokenCredential | null;
}

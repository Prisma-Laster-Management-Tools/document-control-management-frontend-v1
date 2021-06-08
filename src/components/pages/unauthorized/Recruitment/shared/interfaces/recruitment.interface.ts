export interface IGetRecruitmentDataFromTokenResponse {
    id: number;
    firstname: string;
    lastname: string;
    role: string;
    access_token: string;
    already_used: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IRegistrationWithTokenDTO {
    access_token: string;
    email: string;
    password: string;
}

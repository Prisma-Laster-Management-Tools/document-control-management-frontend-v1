export interface ICreateRegistrationAccessLinkForEmployeeDTO {
    firstname: string;
    lastname: string;
    role: string;
}

export interface ICreateRegistrationAccessLinkResponse {
    firstname: string;
    lastname: string;
    role: string;
    access_token: string;
    id: number;
    already_used: boolean;
    createdAt: string;
    updatedAt: string;
}

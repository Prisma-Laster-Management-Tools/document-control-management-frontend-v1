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

export interface IUserData {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    //password: string; // @DONE  will be filtered out from the  backend side
    //salt: string; // @DONE  will be filtered out from the  backend side
    role: 'user' | 'admin';
    position: string; // the string of role [super,hr,qc] -> for the responsibility
    createdAt: string;
    updatedAt: string;
}

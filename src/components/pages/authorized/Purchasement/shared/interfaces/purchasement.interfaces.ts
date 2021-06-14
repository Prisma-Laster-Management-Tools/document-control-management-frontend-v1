export interface IPurchasementPartDetail {
    id: number;
    part_number: string;
    part_name: string;
    part_description: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface ICreatePartDetailDTO {
    part_number: string;
    part_name: string;
    part_description: string;
}

export interface IPurchasementSoruce {
    id: number;
    commercial_number: string;
    part_number: string;
    company: string;
    email: string;
    seller: string;
    createdAt: string;
    updatedAt: string;
}

export interface ICreateSourceDetailDTO {
    part_number: string;
    company: string;
    email: string;
    seller: string;
    commercial_number: string;
}

export interface IPurchasementRequest {
    id: number;
    commercial_number: string;
    quantity: string;
    is_special_request: boolean;
    special_part_name: string;
    special_part_contact: string;
    being_confirmed: true;
    createdAt: string;
    updatedAt: string;
    confirmation_token: string; // should be hidden
    part_number: string | null;
    company: string | null;
    email: string | null;
    seller: string | null;
}

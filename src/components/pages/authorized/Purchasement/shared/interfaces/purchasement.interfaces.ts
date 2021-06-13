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

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

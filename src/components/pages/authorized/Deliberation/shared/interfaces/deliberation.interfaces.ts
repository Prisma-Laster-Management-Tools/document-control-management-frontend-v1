export interface ISaleData {
    id: number;
    product_name: string;
    serial_number: string;
    customer_name: string;
    issued_at: string;
    price: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateSaleDataDTO {
    product_name: string;
    serial_number: string;
    customer_name: string;
    issued_at: string;
    price: number;
}

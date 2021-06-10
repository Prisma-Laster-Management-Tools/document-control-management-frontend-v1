export interface IProductDetail {
    id: number;
    product_code: string;
    product_name: string;
    product_description: string;
    createdAt: string;
    updatedAt: string;
}

export type ICreateProductDetailDTO = Omit<IProductDetail, 'id' | 'createdAt' | 'updatedAt'>;

export interface IProductList {
    id: number;
    serial_number: string;
    product_code: string;
    createdAt: string;
    updatedAt: string;
    product_name: string;
    product_description: string;
    quality_passed: boolean | null;
    is_in_queue: boolean;
}

export type ICreateProductDTO = Pick<IProductList, 'product_code' | 'serial_number'>;

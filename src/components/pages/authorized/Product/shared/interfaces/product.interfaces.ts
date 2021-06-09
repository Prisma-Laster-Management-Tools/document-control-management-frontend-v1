export interface IProductDetail {
    id: number;
    product_code: string;
    product_name: string;
    product_description: string;
    createdAt: string;
    updatedAt: string;
}

export type ICreateProductDetailDTO = Omit<IProductDetail, 'id' | 'createdAt' | 'updatedAt'>;

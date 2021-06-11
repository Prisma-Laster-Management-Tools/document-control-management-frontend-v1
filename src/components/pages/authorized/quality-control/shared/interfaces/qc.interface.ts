import { IProductList } from '../../../Product/shared/interfaces/product.interfaces';

export interface ISendProductToControlQueueDTO {
    product_id: number;
}

export interface IQualityInQueueData {
    id: number;
    createdAt: string;
    updatedAt: string;
    product: Omit<IProductList, 'product_name' | 'product_description' | 'is_in_queue'>;
}

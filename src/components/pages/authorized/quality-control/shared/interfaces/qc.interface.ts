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

export interface IQualityControlProtocol {
    id: number;
    product_code: string;
    process_order: number;
    process_description: string;
    required_attachment: boolean;
    attachment_path: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface ICreateProtocalDTO {
    product_code: string;
    process_order: number;
    process_description: string;
    required_attachment: boolean;
    attachment_path?: string;
}

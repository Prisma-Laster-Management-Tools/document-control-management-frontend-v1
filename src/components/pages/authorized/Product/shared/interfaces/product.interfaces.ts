import { IQualityControlProtocol } from '../../../quality-control/shared/interfaces/qc.interface';

export interface IProductDetail {
    id: number;
    product_code: string;
    product_name: string;
    product_description: string;
    protocol?: IQualityControlProtocol[];
    product_entity?: Array<IProductList>;
    images_path: string | null;
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
    prod_manufact_code: string | null;
    already_shipped: boolean;
}

export type ICreateProductDTO = Pick<IProductList, 'product_code' | 'serial_number'>;

//
// ─── CO OPEARATIVE WITH THE QC MODULES ──────────────────────────────────────────
//
// MIGHT BE MOVED LATER
export interface IControlProecssOfProduct {
    id: number;
    group_code: string;
    protocol_description: string;
    number_of_protocol: number;
    check_status: boolean;
    stamper_firstname: string;
    stamper_lastname: string;
    createdAt: string;
    updatedAt: string;
    product: {
        id: number;
        serial_number: string;
        product_code: string;
        quality_passed: boolean;
        createdAt: string;
        updatedAt: string;
    };
    protocol: {
        id: number;
        product_code: string;
        process_order: number;
        process_description: string;
        required_attachment: boolean;
        attachment_path: string | null;
        createdAt: string;
        updatedAt: string;
    };
}
// ────────────────────────────────────────────────────────────────────────────────

import { IProductList } from '../../../Product/shared/interfaces/product.interfaces';

export interface ISaleData {
    id: number;
    product_name: string;
    serial_number: string;
    customer_name: string;
    issued_at: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    feedback: IFeedbackData | null;
}

export interface CreateSaleDataDTO {
    product_name: string;
    serial_number: string;
    customer_name: string;
    issued_at: string;
    price: number;
}

export interface IFeedbackData {
    id: number;
    quality_rating_score: number | null;
    worthiness_rating_score: number | null;
    delivery_rating_score: number | null;
    service_rating_score: number | null;
    feedback_str: string | null;
    access_token: string;
    createdAt: string;
    updatedAt: string;
    sales: ISaleData;
}

export type TFeedbackCreationDTO = Omit<IFeedbackData, 'id' | 'createdAt' | 'updatedAt' | 'sales'>;

//
// ─── NEW SYSTEM ─────────────────────────────────────────────────────────────────
//
export interface ICreateProductManufactShippingDTO {
    product_code: string;
    product_name: string;
    total_products: string;
    price: number;
    buyer_name: string;
    buyer_contact: string | null;
}

export interface IProductManufactData {
    id: number;
    generated_key: string;
    product_code: string;
    product_name: string;
    total_products: number;
    price: number;
    shipping_status: boolean;
    buyer_name: string;
    buyer_contact: string | null;
    shipping_evidence: string | null;
    shipping_evidence_uploaded_at: string | null;
    shipping_address: string;

    stamper_firstname: string | null;
    stamper_lastname: string | null;

    createdAt: string;
    updatedAt: string;
    product: Array<IProductList>;
}
// ────────────────────────────────────────────────────────────────────────────────

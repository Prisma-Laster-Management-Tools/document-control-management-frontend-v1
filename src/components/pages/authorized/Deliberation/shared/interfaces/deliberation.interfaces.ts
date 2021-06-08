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

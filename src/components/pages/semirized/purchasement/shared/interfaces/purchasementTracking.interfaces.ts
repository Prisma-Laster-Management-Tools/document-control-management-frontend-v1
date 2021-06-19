// TODO override this to the existing interface that was create before this one in the vanila purchasement folder -> authorized
export interface IPurchasementData {
    id: number;
    commercial_number: string;
    company: string;
    seller: string;
    contact_number: string | null;
    email: string;
    part_number: string;
    part_name: string;
    quantity: string;
    price: number;
    is_special_request: boolean;
    special_part_name: string | null;
    special_part_contact: string | null;
    confirmation_token: string;
    being_confirmed: boolean;
    is_order_accepted: boolean | null;
    delivery_attachments: string | null;
    payment_attachments: string | null;
    purchasement_successfully: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ICreateResponseToRequestDTO {
    accept: boolean;
}

export interface INotificationData {
    message: string;
    related_positions: string | null;
    attached_params: string; // separator is :
    id: number;
    required_attention: boolean;
    createdAt: string;
    updatedAt: string;
}

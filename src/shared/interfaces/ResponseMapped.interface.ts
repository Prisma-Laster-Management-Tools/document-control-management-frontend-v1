export interface IResponseMapped<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error_type?: 'validation' | 'authorization';
}

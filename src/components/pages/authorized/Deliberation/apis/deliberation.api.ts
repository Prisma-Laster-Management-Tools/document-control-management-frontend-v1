import { AxiosPromise } from 'axios';
import API_instance from '../../../../../core/axios/instance';
import { transformDataFromAxiosPromiseToReadableFormat } from '../../../../../core/axios/response-mapper';
import { CreateSaleDataDTO } from '../shared/interfaces/deliberation.interfaces';

export async function API_GetAllSalesData() {
    const axios_promise: Promise<AxiosPromise> = API_instance.get('/api/sales?page=1&limit=10000000'); // fetch all with no pagination
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_GetSalesData(id: number) {
    const axios_promise: Promise<AxiosPromise> = API_instance.get(`/api/sales/${id}`); // fetch all with no pagination
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_CreateSaleData(sale_data: CreateSaleDataDTO) {
    const axios_promise: Promise<AxiosPromise> = API_instance.post('/api/sales', sale_data);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_GetFeedbackData(id: number) {
    const axios_promise: Promise<AxiosPromise> = API_instance.get(`/api/sales/${id}/feedback`);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_CreateFeedbackAccessToken(id: number) {
    const axios_promise: Promise<AxiosPromise> = API_instance.get(`/api/sales/${id}/feedback/create-feedback-access-link`);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

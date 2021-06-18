import { AxiosPromise } from 'axios';
import API_instance from '../../../../../core/axios/instance';
import { transformDataFromAxiosPromiseToReadableFormat } from '../../../../../core/axios/response-mapper';
import { ICreatePartDetailDTO, ICreatePurchasementRequestDTO, ICreateSourceDetailDTO } from '../shared/interfaces/purchasement.interfaces';

export async function API_GetAllPartDetail() {
    const axios_promise: Promise<AxiosPromise> = API_instance.get('/api/purchasement/part-detail');
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_CreatePartDetail(data: ICreatePartDetailDTO) {
    const axios_promise: Promise<AxiosPromise> = API_instance.post('/api/purchasement/create-part-detail', data);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_RemovePartDetail(part_number: string) {
    const axios_promise: Promise<AxiosPromise> = API_instance.delete('/api/purchasement/remove-part-detail/' + part_number);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_GetAllSourceDetail() {
    const axios_promise: Promise<AxiosPromise> = API_instance.get('/api/purchasement/source');
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_CreateSourceDetail(data: ICreateSourceDetailDTO) {
    const axios_promise: Promise<AxiosPromise> = API_instance.post('/api/purchasement/create-source-detail', data);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_RemoveSourceDetail(id: number) {
    const axios_promise: Promise<AxiosPromise> = API_instance.delete('/api/purchasement/remove-source-detail/' + id);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_GetPurchasementRequest(confirmation_token: string) {
    const axios_promise: Promise<AxiosPromise> = API_instance.get('/api/purchasement/request/' + confirmation_token);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_GetAllPurchasementRequest() {
    const axios_promise: Promise<AxiosPromise> = API_instance.get('/api/purchasement/requests?limit=100000000000000&page=1');
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_GetPurchasementSource(id: number) {
    const axios_promise: Promise<AxiosPromise> = API_instance.get(`/api/purchasement/source/${id}`);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_CreatePurchasementRequest(data: ICreatePurchasementRequestDTO) {
    const axios_promise: Promise<AxiosPromise> = API_instance.post('/api/purchasement/create-purchasement-request', data);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

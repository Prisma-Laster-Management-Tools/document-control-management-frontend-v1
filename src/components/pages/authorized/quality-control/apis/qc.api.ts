import { AxiosPromise } from 'axios';
import API_instance from '../../../../../core/axios/instance';
import { transformDataFromAxiosPromiseToReadableFormat } from '../../../../../core/axios/response-mapper';
import { ICreateControlProcessDTO, ICreateProtocalDTO, ISendProductToControlQueueDTO } from '../shared/interfaces/qc.interface';

export async function API_SendProductToControlQueue(data: ISendProductToControlQueueDTO) {
    const axios_promise: Promise<AxiosPromise> = API_instance.post('/api/quality-control/queue', data);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_GetAllProductInControlQueue() {
    const axios_promise: Promise<AxiosPromise> = API_instance.get('/api/quality-control/queue');
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_GetProtocolListFromProductCode(product_code: string) {
    const axios_promise: Promise<AxiosPromise> = API_instance.get('/api/quality-control/get-protocol-lists/' + product_code);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_CreateProtocolForProductCode(data: ICreateProtocalDTO) {
    const axios_promise: Promise<AxiosPromise> = API_instance.post('/api/quality-control/create-protocol', data);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_RemoveProtocol(id: number) {
    const axios_promise: Promise<AxiosPromise> = API_instance.delete('/api/quality-control/remove-protocol/' + id);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_RemoveProductFromQueue(id: number) {
    const axios_promise: Promise<AxiosPromise> = API_instance.delete('/api/quality-control/queue/' + id);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_CreateControlProcessForProduct(data: ICreateControlProcessDTO) {
    const axios_promise: Promise<AxiosPromise> = API_instance.post('/api/quality-control/control-phase@bulk', data);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

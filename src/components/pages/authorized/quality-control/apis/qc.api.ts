import { AxiosPromise } from 'axios';
import API_instance from '../../../../../core/axios/instance';
import { transformDataFromAxiosPromiseToReadableFormat } from '../../../../../core/axios/response-mapper';
import { ICreateProtocalDTO, ISendProductToControlQueueDTO } from '../shared/interfaces/qc.interface';

export async function API_SendProductToControlQueue(data: ISendProductToControlQueueDTO) {
    const axios_promise: Promise<AxiosPromise> = API_instance.post('/api/quality-control/queue', data); // fetch all with no pagination
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_GetAllProductInControlQueue() {
    const axios_promise: Promise<AxiosPromise> = API_instance.get('/api/quality-control/queue'); // fetch all with no pagination
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_GetProtocolListFromProductCode(product_code: string) {
    const axios_promise: Promise<AxiosPromise> = API_instance.get('/api/quality-control/get-protocol-lists/' + product_code); // fetch all with no pagination
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_CreateProtocolForProductCode(data: ICreateProtocalDTO) {
    const axios_promise: Promise<AxiosPromise> = API_instance.post('/api/quality-control/create-protocol', data); // fetch all with no pagination
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_RemoveProtocol(id: number) {
    const axios_promise: Promise<AxiosPromise> = API_instance.delete('/api/quality-control/remove-protocol/' + id); // fetch all with no pagination
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

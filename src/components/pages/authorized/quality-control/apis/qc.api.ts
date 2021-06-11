import { AxiosPromise } from 'axios';
import API_instance from '../../../../../core/axios/instance';
import { transformDataFromAxiosPromiseToReadableFormat } from '../../../../../core/axios/response-mapper';
import { ISendProductToControlQueueDTO } from '../shared/interfaces/qc.interface';

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

import { AxiosPromise } from 'axios';
import API_instance from '../../../../../core/axios/instance';
import { transformDataFromAxiosPromiseToReadableFormat } from '../../../../../core/axios/response-mapper';
import { ICreatePartDetailDTO } from '../shared/interfaces/purchasement.interfaces';

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

import { AxiosPromise } from 'axios';
import API_instance from '../../../../../core/axios/instance';
import { transformDataFromAxiosPromiseToReadableFormat } from '../../../../../core/axios/response-mapper';
import { ICreateResponseToRequestDTO } from '../shared/interfaces/purchasementTracking.interfaces';

export async function API_CreateResponseToRequest(confirmation_token: string, data: ICreateResponseToRequestDTO) {
    const axios_promise: Promise<AxiosPromise> = API_instance.post(`/api/purchasement/confirmation/${confirmation_token}/response`, data);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_ClientUploadEvidence(confirmation_token: string, data: FormData) {
    const axios_promise: Promise<AxiosPromise> = API_instance.post(`/api/purchasement/confirmation/${confirmation_token}/client-upload-evidence`, data);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_EmployeeCloseRequest(confirmation_token: string) {
    const axios_promise: Promise<AxiosPromise> = API_instance.get(`/api/purchasement/confirmation/${confirmation_token}/close`);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_EmployeeUploadEvidence(confirmation_token: string, data: FormData) {
    const axios_promise: Promise<AxiosPromise> = API_instance.post(`/api/purchasement/confirmation/${confirmation_token}/employee-upload-evidence`, data);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

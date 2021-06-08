import { AxiosPromise } from 'axios';
import API_instance from '../../../../core/axios/instance';
import { transformDataFromAxiosPromiseToReadableFormat } from '../../../../core/axios/response-mapper';
import { TFeedbackCreationDTO } from '../../authorized/Deliberation/shared/interfaces/deliberation.interfaces';

export async function API_VerifyFeedbackToken(access_token: string) {
    const axios_promise: Promise<AxiosPromise> = API_instance.get(`/api/feedback/verify/${access_token}`);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_CreateFeedback(data: TFeedbackCreationDTO, id: number) {
    const axios_promise: Promise<AxiosPromise> = API_instance.post(`/api/sales/${id}/feedback`, data);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

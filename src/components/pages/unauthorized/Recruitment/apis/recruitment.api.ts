import { AxiosPromise } from 'axios';
import API_instance from '../../../../../core/axios/instance';
import { transformDataFromAxiosPromiseToReadableFormat } from '../../../../../core/axios/response-mapper';
import { IRegistrationWithTokenDTO } from '../shared/interfaces/recruitment.interface';

export async function API_GetRecruitmentDataFromToken(access_token: string) {
    const axios_promise: Promise<AxiosPromise> = API_instance.get(`/api/recruitment/verify/${access_token}`);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_RegistrationWithToken(data: IRegistrationWithTokenDTO) {
    const axios_promise: Promise<AxiosPromise> = API_instance.post(`/api/recruitment/registration`, data);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

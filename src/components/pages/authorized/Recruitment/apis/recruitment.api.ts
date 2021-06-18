import { AxiosPromise } from 'axios';
import API_instance from '../../../../../core/axios/instance';
import { transformDataFromAxiosPromiseToReadableFormat } from '../../../../../core/axios/response-mapper';
import { ICreateRegistrationAccessLinkForEmployeeDTO } from '../shared/interfaces/recruitment.interface';

export async function API_GetAllRecruitmentGeneratedToken() {
    const axios_promise: Promise<AxiosPromise> = API_instance.get('/api/recruitment');
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_RemoveRecruitmentGeneratedToken(id: number) {
    const axios_promise: Promise<AxiosPromise> = API_instance.delete('/api/recruitment/token/' + id);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_CreateRegistrationAccessLinkForEmployee(createRegistrationAccessLinkForEmployeeDTO: ICreateRegistrationAccessLinkForEmployeeDTO) {
    const axios_promise: Promise<AxiosPromise> = API_instance.post('/api/recruitment', createRegistrationAccessLinkForEmployeeDTO);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_GetAllUserData() {
    const axios_promise: Promise<AxiosPromise> = API_instance.get('/api/user');
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

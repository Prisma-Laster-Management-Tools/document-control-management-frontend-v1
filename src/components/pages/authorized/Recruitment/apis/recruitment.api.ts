import { AxiosPromise } from 'axios';
import API_instance from '../../../../../core/axios/instance';
import { transformDataFromAxiosPromiseToReadableFormat } from '../../../../../core/axios/response-mapper';
import { ICreateRegistrationAccessLinkForEmployeeDTO } from '../shared/interfaces/recruitment.interface';

export async function API_CreateRegistrationAccessLinkForEmployee(createRegistrationAccessLinkForEmployeeDTO: ICreateRegistrationAccessLinkForEmployeeDTO) {
    const axios_promise: Promise<AxiosPromise> = API_instance.post('/api/recruitment', createRegistrationAccessLinkForEmployeeDTO);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

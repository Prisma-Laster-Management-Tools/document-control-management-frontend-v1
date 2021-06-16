import { AxiosPromise } from 'axios';
import API_instance from '../../../../../core/axios/instance';
import { transformDataFromAxiosPromiseToReadableFormat } from '../../../../../core/axios/response-mapper';
import { ICreateMaintenanceCycleDTO } from '../shared/interfaces/maintenance.interfaces';

export async function API_GetAllMaintenanceCycleData() {
    const axios_promise: Promise<AxiosPromise> = API_instance.get('/api/maintenance/');
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_RemoveMaintenanceCycleData(id: number) {
    const axios_promise: Promise<AxiosPromise> = API_instance.delete('/api/maintenance/' + id);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_CreateMaintenanceCycle(data: ICreateMaintenanceCycleDTO) {
    const axios_promise: Promise<AxiosPromise> = API_instance.post('/api/maintenance/', data);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

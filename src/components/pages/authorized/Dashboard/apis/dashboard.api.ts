import { AxiosPromise } from 'axios';
import API_instance from '../../../../../core/axios/instance';
import { transformDataFromAxiosPromiseToReadableFormat } from '../../../../../core/axios/response-mapper';

export async function API_GetQcStatistic() {
    const axios_promise: Promise<AxiosPromise> = API_instance.get('/api/statistic/quality-control');
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_GetPurchasementStatistic() {
    const axios_promise: Promise<AxiosPromise> = API_instance.get('/api/statistic/purchasement');
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_GetRecruitmentStatistic() {
    const axios_promise: Promise<AxiosPromise> = API_instance.get('/api/statistic/recruitment');
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_GetMaintenanceStatistic() {
    const axios_promise: Promise<AxiosPromise> = API_instance.get('/api/statistic/maintenance');
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

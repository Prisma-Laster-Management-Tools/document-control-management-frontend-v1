import { AxiosPromise } from 'axios';
import API_instance from '../../../../../core/axios/instance';
import { transformDataFromAxiosPromiseToReadableFormat } from '../../../../../core/axios/response-mapper';
import { ICreateCalibrationCycleDTO } from '../shared/interfaces/calibration.interfaces';

export async function API_GetAllCalibrationCycleData() {
    const axios_promise: Promise<AxiosPromise> = API_instance.get('/api/calibration/');
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_RemoveCalibrationCycleData(id: number) {
    const axios_promise: Promise<AxiosPromise> = API_instance.delete('/api/calibration/' + id);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_GetAllCalibrationEvidenceOfSpecificProduct(serial_number: string) {
    const axios_promise: Promise<AxiosPromise> = API_instance.get('/api/calibration/evidence/' + serial_number);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_CreateCalibrationCycle(data: ICreateCalibrationCycleDTO) {
    const axios_promise: Promise<AxiosPromise> = API_instance.post('/api/calibration/', data);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_CreateCalibrationEvidence(data: FormData) {
    const axios_promise: Promise<AxiosPromise> = API_instance.post('/api/calibration/evidence', data);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

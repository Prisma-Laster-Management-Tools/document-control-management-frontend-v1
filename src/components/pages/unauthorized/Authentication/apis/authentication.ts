import { AxiosPromise } from 'axios';
import API_instance from '../../../../../core/axios/instance';
import { transformDataFromAxiosPromiseToReadableFormat } from '../../../../../core/axios/response-mapper';
import { IResponseMapped } from '../../../../../shared/interfaces/ResponseMapped.interface';

/*export async function API_Login(): Promise<IResponseMapped> {
  try {
    const response = await API_instance.post('/api/user/login', { email: 'thiti.mwk.main@gmail.com', passwords: '5550123Por' });
    const { data } = response;
    return { success: true, data };
  } catch (error) {
    const { statusCode, message, errors } = error.response.data;
    if (statusCode === 400) {
      if (message === 'Validation Error') {
        return { success: false, error_type: 'validation', data: errors };
      }
    }

    // our of the case
    return { success: false, message };
  }
}
*/

export async function API_Login(email: string, password: string) {
  const axios_promise: Promise<AxiosPromise> = API_instance.post('/api/user/login', { email, password });
  const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
  return mapped_response;
}

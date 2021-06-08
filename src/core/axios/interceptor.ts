import { LocalStorage } from '../persist/local-storage';
import API_Instance from './instance';

API_Instance.interceptors.request.use(async function (config) {
    /*config.timeout = parseInt(
      getEnvironmentVariable('AXIOS_TIMEOUT_DURATION') as string
    );*/
    const token = LocalStorage.get_data_from_key('token');
    config.headers['Authorization'] = 'Bearer ' + token;
    return config;
});

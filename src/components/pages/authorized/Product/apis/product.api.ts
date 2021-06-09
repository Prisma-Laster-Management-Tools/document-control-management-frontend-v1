import { AxiosPromise } from 'axios';
import API_instance from '../../../../../core/axios/instance';
import { transformDataFromAxiosPromiseToReadableFormat } from '../../../../../core/axios/response-mapper';
import { ICreateProductDetailDTO } from '../shared/interfaces/product.interfaces';

export async function API_GetAllProductDetail() {
    const axios_promise: Promise<AxiosPromise> = API_instance.get('/api/product/details'); // fetch all with no pagination
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_AddProductDetail(data: ICreateProductDetailDTO) {
    const axios_promise: Promise<AxiosPromise> = API_instance.post('/api/product/create-product-detail', data); // fetch all with no pagination
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_RemoveProductDetail(product_code: string) {
    const axios_promise: Promise<AxiosPromise> = API_instance.delete('/api/product/remove-product-detail/' + product_code); // fetch all with no pagination
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

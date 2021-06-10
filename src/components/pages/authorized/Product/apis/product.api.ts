import { AxiosPromise } from 'axios';
import API_instance from '../../../../../core/axios/instance';
import { transformDataFromAxiosPromiseToReadableFormat } from '../../../../../core/axios/response-mapper';
import { ICreateProductDetailDTO, ICreateProductDTO } from '../shared/interfaces/product.interfaces';

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

export async function API_GetProductDetails() {
    const axios_promise: Promise<AxiosPromise> = API_instance.get('/api/product/details'); // fetch all with no pagination
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_RemoveProductDetail(product_code: string) {
    const axios_promise: Promise<AxiosPromise> = API_instance.delete('/api/product/remove-product-detail/' + product_code); // fetch all with no pagination
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

//
// ─── PRODUCT SELF (created one) ───────────────────────────────────────────────────────────────
//
export async function API_GetAllProduct() {
    const axios_promise: Promise<AxiosPromise> = API_instance.get('/api/product?limit=1000000000&page=1'); // fetch all with no pagination
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_CreateProduct(data: ICreateProductDTO) {
    const axios_promise: Promise<AxiosPromise> = API_instance.post('/api/product/create-product', data); // fetch all with no pagination
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_RemoveProduct(serial_number: string) {
    const axios_promise: Promise<AxiosPromise> = API_instance.delete('/api/product/remove-product/' + serial_number); // fetch all with no pagination
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

// ────────────────────────────────────────────────────────────────────────────────

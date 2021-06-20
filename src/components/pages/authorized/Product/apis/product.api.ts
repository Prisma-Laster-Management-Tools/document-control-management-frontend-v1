import { AxiosPromise } from 'axios';
import API_instance from '../../../../../core/axios/instance';
import { transformDataFromAxiosPromiseToReadableFormat } from '../../../../../core/axios/response-mapper';
import { ICreateProductDetailDTO, ICreateProductDTO } from '../shared/interfaces/product.interfaces';
import qs from 'querystring';
export async function API_GetAllProductDetail(query?: { with_protocol?: boolean; with_product?: boolean }) {
    const query_string = qs.stringify(query);
    const axios_promise: Promise<AxiosPromise> = API_instance.get('/api/product/details?' + query_string); // fetch all with no pagination
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
    const axios_promise: Promise<AxiosPromise> = API_instance.get('/api/product?limit=1000000000&page=1');
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_CreateProduct(data: ICreateProductDTO) {
    const axios_promise: Promise<AxiosPromise> = API_instance.post('/api/product/create-product', data);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_CreateProductBULK(data: { importation_datas: Array<ICreateProductDTO> }) {
    const axios_promise: Promise<AxiosPromise> = API_instance.post('/api/product/create-product@bulk', data);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_GetRandomUnusedSerialNumber() {
    const axios_promise: Promise<AxiosPromise> = API_instance.get('/api/product/generate-serial-number');
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

export async function API_RemoveProduct(serial_number: string) {
    const axios_promise: Promise<AxiosPromise> = API_instance.delete('/api/product/remove-product/' + serial_number);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}

// ────────────────────────────────────────────────────────────────────────────────

//
// ─── CO OPERATE WITH THE QC ─────────────────────────────────────────────────────
//
// might be moved later
export async function API_GetProductHistoryTimelineOfTheQcProcess(product_id: number) {
    const axios_promise: Promise<AxiosPromise> = API_instance.get('/api/quality-control/control-phase/process/' + product_id);
    const mapped_response = await transformDataFromAxiosPromiseToReadableFormat(axios_promise, { on_success: '*', on_fail: '*' });
    return mapped_response;
}
// ────────────────────────────────────────────────────────────────────────────────

import { AxiosPromise } from 'axios';
import { IResponseMapped } from '../../shared/interfaces/ResponseMapped.interface';

interface IExtractionData {
  on_success: ListOfDataExtraction;
  on_fail: ListOfDataExtraction;
}

type ListOfDataExtraction = Array<string> | '*';

export async function transformDataFromAxiosPromiseToReadableFormat($axios_promise: Promise<AxiosPromise>, extraction_lists: IExtractionData): Promise<IResponseMapped> {
  const is_on_success_has_wildcard_extraction = extraction_lists.on_success === '*';
  const is_on_fail_has_wildcard_extraction = extraction_lists.on_fail === '*';
  //if extraction_lists properties contain "*" means to extract all value
  try {
    const response = await $axios_promise;
    const { data } = response;
    if (is_on_success_has_wildcard_extraction) {
      return { success: true, data }; // return all data
    } else {
      const filtered_returned_data: any = {};
      for (let extraction_key of extraction_lists.on_success) {
        filtered_returned_data[extraction_key] = data[extraction_key];
      }
      return { success: true, data: filtered_returned_data };
    }
  } catch (error) {
    const { statusCode, message, errors } = error.response.data;
    let error_type: IResponseMapped['error_type'] = undefined;
    if (statusCode === 400) {
      if (message === 'Validation Error') {
        error_type = 'validation';
      }
    } else if (statusCode === 401) {
      error_type = 'authorization';
    }

    if (is_on_fail_has_wildcard_extraction) {
      return { success: false, data: error.response.data, error_type }; // return all data
    } else {
      const filtered_returned_data: any = {};
      for (let extraction_key of extraction_lists.on_fail) {
        filtered_returned_data[extraction_key] = error.response.data[extraction_key];
      }
      return { success: true, data: filtered_returned_data, error_type };
    }
  }
}

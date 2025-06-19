import { Injectable } from '@angular/core';
import { Adapter } from '../../../interfaces/adapter/iadapter';
import { IErrorResponse, IGetProductResponse } from '../../../interfaces/products/iproduct';

@Injectable({
  providedIn: 'root',
})
export class GetProductAdapter implements Adapter {
  constructor() {}

  successAdapt(data: IGetProductResponse): IGetProductResponse {
    return {
      message: 'success',
      product: data.product,
    };
  }

  errAdapt(error: any): IErrorResponse {
    return {
      message: 'error',
      error: error?.message || 'An error occurred while fetching the occasion.',
    };
  }
}

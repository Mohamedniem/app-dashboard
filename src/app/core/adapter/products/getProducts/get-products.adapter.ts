import { Injectable } from '@angular/core';
import { Adapter } from '../../../interfaces/adapter/iadapter';
import { IGetProductsResponse, IErrorResponse } from '../../../interfaces/products/iproduct';

@Injectable({
  providedIn: 'root',
})
export class GetProductsAdapter implements Adapter {
  constructor() {}

  successAdapt(data: IGetProductsResponse): IGetProductsResponse {
    return {
      message: 'success',
      metadata: {
        totalPages: data.metadata.totalPages,
        totalItems: data.metadata.totalItems,
      },
      products: data.products,
    };
  }

  errAdapt(error: any): IErrorResponse {
    return {
      message: 'error',
      error: error?.message || 'An error occurred while fetching the occasions.',
    };
  }
}

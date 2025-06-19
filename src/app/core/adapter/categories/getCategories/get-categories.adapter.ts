import { Injectable } from '@angular/core';
import { Adapter } from '../../../interfaces/adapter/iadapter';
import { IErrorResponse, IGetCategoriesResponse } from '../../../interfaces/category/icategory';

@Injectable({
  providedIn: 'root',
})
export class GetCategoriesAdapter implements Adapter {
  constructor() {}

  successAdapt(data: IGetCategoriesResponse): IGetCategoriesResponse {
    return {
      message: 'success',
      metadata: {
        totalPages: data.metadata.totalPages,
        totalItems: data.metadata.totalItems,
      },
      categories: data.categories,
    };
  }

  errAdapt(error: any): IErrorResponse {
    return {
      message: 'error',
      error: error?.message || 'An error occurred while fetching the category.',
    };
  }
}

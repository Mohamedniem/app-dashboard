import { Injectable } from '@angular/core';
import { Adapter } from '../../interfaces/adapter/iadapter';
import { IErrorResponse, IGetCategoryResponse } from '../../interfaces/category/icategory';

@Injectable({
  providedIn: 'root'
})
export class GetCategoryAdapter implements Adapter {

  constructor() { }

  successAdapt(data: any): IGetCategoryResponse {
    return {
      message: "success",
      category: data.category
    };
  }

  errAdapt(error: any): IErrorResponse {
    return {
      message: "error",
      error: error?.message || "An error occurred while fetching the category."
    };
  };
}

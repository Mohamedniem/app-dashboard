import { Injectable } from '@angular/core';
import { Adapter } from '../../../interfaces/adapter/iadapter';
import { IErrorResponse, IGetOccasionResponse } from '../../../interfaces/occasion/ioccasion';

@Injectable({
  providedIn: 'root',
})
export class GetOccasionAdapter implements Adapter {
  constructor() {}

  successAdapt(data: IGetOccasionResponse): IGetOccasionResponse {
    return {
      message: 'success',
      occasion: data.occasion,
    };
  }

  errAdapt(error: any): IErrorResponse {
    return {
      message: 'error',
      error: error?.message || 'An error occurred while fetching the occasion.',
    };
  }
}

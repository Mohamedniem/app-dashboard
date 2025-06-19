import { Injectable } from '@angular/core';
import { Adapter } from '../../../interfaces/adapter/iadapter';
import { IErrorResponse, IGetOccasionsResponse } from '../../../interfaces/occasion/ioccasion';

@Injectable({
  providedIn: 'root',
})
export class GetOccasionsAdapter implements Adapter {
  constructor() {}

  successAdapt(data: IGetOccasionsResponse): IGetOccasionsResponse {
    return {
      message: 'success',
      metadata: {
        totalPages: data.metadata.totalPages,
        totalItems: data.metadata.totalItems,
      },
      occasions: data.occasions,
    };
  }

  errAdapt(error: any): IErrorResponse {
    return {
      message: 'error',
      error: error?.message || 'An error occurred while fetching the occasions.',
    };
  }
}

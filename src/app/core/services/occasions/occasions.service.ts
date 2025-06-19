import { IGetOccasionResponse } from './../../interfaces/occasion/ioccasion';
import { GetOccasionAdapter } from './../../adapter/occasions/getOccasion/get-occasion.adapter';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { GetOccasionsAdapter } from '../../adapter/occasions/getOccasions/get-occasions.adapter';
import { IErrorResponse, IGetOccasionsResponse } from '../../interfaces/occasion/ioccasion';

@Injectable({
  providedIn: 'root'
})
export class OccasionsService {

  constructor(private _httpClient: HttpClient, private _getOccasionsAdapter : GetOccasionsAdapter, private _getOccasionAdapter : GetOccasionAdapter) { }
  
  getOccasions(): Observable<IGetOccasionsResponse | IErrorResponse> {
    return this._httpClient.get<IGetOccasionsResponse>(`${environment.baseUrl}api/v1/occasions`).pipe(
      map(res => this._getOccasionsAdapter.successAdapt(res)),
      catchError(err => of(this._getOccasionsAdapter.errAdapt(err)))
    );
  };

  getOccasion(id: string): Observable<IGetOccasionResponse | IErrorResponse> {
    return this._httpClient.get<IGetOccasionResponse>(`${environment.baseUrl}api/v1/occasions/${id}`).pipe(
      map(res => this._getOccasionAdapter.successAdapt(res)),
      catchError(err => of(this._getOccasionAdapter.errAdapt(err)))
    );
  };

  // Feature not working due to missing super admin credentials
  // Cannot get response to build an interface
  deleteOccasion(id: string): Observable<any> {
    return this._httpClient.delete(`${environment.baseUrl}api/v1/occasions/${id}`);
  };

  // Feature not working due to missing super admin credentials
  // Cannot get response to build an interface
  updateOccasion(id: string, data: FormData): Observable<any> {
    return this._httpClient.put(`${environment.baseUrl}api/v1/occasions/${id}`, data);
  };

  // Feature not working due to missing super admin credentials
  // Cannot get response to build an interface
  addOccasion(occasion: FormData):Observable<any>{
    return this._httpClient.post(`${environment.baseUrl}api/v1/occasions`, occasion);
  };
}

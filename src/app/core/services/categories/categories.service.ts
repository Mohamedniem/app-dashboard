import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { IErrorResponse, IGetCategoriesResponse, IGetCategoryResponse } from '../../interfaces/category/icategory';
import { GetCategoriesAdapter } from '../../adapter/categories/getCategories/get-categories.adapter';
import { GetCategoryAdapter } from '../../adapter/categories/getCategory/get-category.adapter';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _httpClient: HttpClient, private _getCategoriesAdapter : GetCategoriesAdapter, private _getCategoryAdapter : GetCategoryAdapter) { }

  getCategories(): Observable<IGetCategoriesResponse | IErrorResponse> {
    return this._httpClient.get<IGetCategoriesResponse>(`${environment.baseUrl}api/v1/categories`).pipe(
      map(res => this._getCategoriesAdapter.successAdapt(res)),
      catchError(err => of(this._getCategoriesAdapter.errAdapt(err)))
    );
  };

  getCategory(id: string): Observable<IGetCategoryResponse | IErrorResponse> {
    return this._httpClient.get<IGetCategoryResponse>(`${environment.baseUrl}api/v1/categories/${id}`).pipe(
      map(res => this._getCategoryAdapter.successAdapt(res)),
      catchError(err => of(this._getCategoryAdapter.errAdapt(err)))
    );
  };

  // Feature not working due to missing super admin credentials
  // Cannot get response to build an interface
  deleteCategory(id: string): Observable<any> {
    return this._httpClient.delete(`${environment.baseUrl}api/v1/categories/${id}`);
  };

  // Feature not working due to missing super admin credentials
  // Cannot get response to build an interface
  updateCategory(id: string, data: any): Observable<any> {
    return this._httpClient.put(`${environment.baseUrl}api/v1/categories/${id}`, data);
  };

  // Feature not working due to missing super admin credentials
  // Cannot get response to build an interface
  addCategory(category: object):Observable<any>{
    return this._httpClient.post(`${environment.baseUrl}api/v1/categories`, category);
  };
}



import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _httpClient: HttpClient) { }

  getCategories(): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}api/v1/statistics/categories`);
  };

  getCategory(categoryId: string): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}api/v1/categories/${categoryId}`);
  }

  deleteCategory(id: string): Observable<any> {
    return this._httpClient.delete(`${environment.baseUrl}api/v1/categories/${id}`);
  };

  updateCategory(id: string, data: any): Observable<any> {
    return this._httpClient.put(`${environment.baseUrl}api/v1/categories/${id}`, data);
  };

  addCategory(category: object):Observable<any>{
    return this._httpClient.post(`${environment.baseUrl}api/v1/categories`, category);
  }
}

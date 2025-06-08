import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  headers = new HttpHeaders();

  constructor(private _httpClient: HttpClient) {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        this.headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
      }
    }
  }

  getCategories(): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}api/v1/statistics/categories`, { headers: this.headers });
  }

  deleteCategory(id: string): Observable<any> {
    return this._httpClient.delete(`${environment.baseUrl}api/v1/categories/${id}`, { headers: this.headers });
  }

  updateCategory(id: string, data: any): Observable<any> {
    return this._httpClient.put(`${environment.baseUrl}api/v1/categories/${id}`, data, { headers: this.headers });
  }
}

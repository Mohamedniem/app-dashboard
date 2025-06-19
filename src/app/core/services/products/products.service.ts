import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGetProductResponse, IGetProductsResponse } from '../../interfaces/products/iproduct';
import { IErrorResponse } from '../../interfaces/category/icategory';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { GetProductAdapter } from '../../adapter/products/getProduct/get-product.adapter';
import { GetProductsAdapter } from '../../adapter/products/getProducts/get-products.adapter';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _httpClient: HttpClient, private _getProductsAdapter : GetProductsAdapter, private _getProductAdapter : GetProductAdapter) { }
    
  getProducts(): Observable<IGetProductsResponse | IErrorResponse> {
    return this._httpClient.get<IGetProductsResponse>(`${environment.baseUrl}api/v1/products`).pipe(
      map(res => this._getProductsAdapter.successAdapt(res)),
      catchError(err => of(this._getProductsAdapter.errAdapt(err)))
    );
  };

  getProduct(id: string): Observable<IGetProductResponse | IErrorResponse> {
    return this._httpClient.get<IGetProductResponse>(`${environment.baseUrl}api/v1/products/${id}`).pipe(
      map(res => this._getProductAdapter.successAdapt(res)),
      catchError(err => of(this._getProductAdapter.errAdapt(err)))
    );
  };

  // Feature not working due to missing super admin credentials
  // Cannot get response to build an interface
  deleteProduct(id: string): Observable<any> {
    return this._httpClient.delete(`${environment.baseUrl}api/v1/products/${id}`);
  };

  // Feature not working due to missing super admin credentials
  // Cannot get response to build an interface
  updateProduct(id: string, data: FormData): Observable<any> {
    return this._httpClient.put(`${environment.baseUrl}api/v1/products/${id}`, data);
  };

  // Feature not working due to missing super admin credentials
  // Cannot get response to build an interface
  addProduct(occasion: FormData):Observable<any>{
    return this._httpClient.post(`${environment.baseUrl}api/v1/products`, occasion);
  };
}

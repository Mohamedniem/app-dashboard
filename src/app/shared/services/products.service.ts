import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../core/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient:HttpClient) { }
  
  
    getproducts():Observable<any>{
      return this._HttpClient.get(`${baseUrl}statistics/products`);
    }
}

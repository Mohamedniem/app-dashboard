import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../core/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AllCateogriesService {

  constructor(private _HttpClient:HttpClient) { }
  
  
    getAllCateogries():Observable<any>{
      return this._HttpClient.get(`${baseUrl}statistics/categories`);
    }
}

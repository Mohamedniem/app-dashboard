import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../core/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderstatusService {

  constructor(private _HttpClient:HttpClient) { }
    
    
      getOrderstatus():Observable<any>{
        return this._HttpClient.get(`${baseUrl}statistics/orders`);
      }
}

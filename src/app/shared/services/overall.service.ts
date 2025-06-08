import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../core/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OverallService {

  constructor(private _HttpClient:HttpClient) { }


  getOverall():Observable<any>{
    return this._HttpClient.get(`${baseUrl}statistics/overall`);
  }
}

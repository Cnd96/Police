import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrafficPolicemenService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:3000/api/';
  
  getTrafficPolicemen(id){
    return this.http.get(this.baseUrl + 'policemen?policeStationId='+id);
  }
  createTrafficPoliceman(policeman:any){
    return this.http.post(this.baseUrl + 'policemen',policeman);
  }
}

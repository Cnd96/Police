import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrafficPolicemanService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:3000/api/';
  policeManId:any;

  getTrafficPolicemen(policeStationId){
    return this.http.get(this.baseUrl + 'policemen?policeStationId='+policeStationId);
  }
}

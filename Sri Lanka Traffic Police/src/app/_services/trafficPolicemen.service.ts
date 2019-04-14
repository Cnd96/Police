import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrafficPolicemenService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:3000/api/';
  policeManId:any;

  getTrafficPolicemen(policeStationId){
    return this.http.get(this.baseUrl + 'policemen?policeStationId='+policeStationId);
  }
  searchTrafficPolicemen(policeStationId,string){
    return this.http.get(this.baseUrl + 'searchPoliceman?policeStationId='+policeStationId+'&policemanName='+string);
  }
  createTrafficPoliceman(policeman:any){
    return this.http.post(this.baseUrl + 'policemen',policeman);
  }
  getTrafficPoliceman(policeManId){
    return this.http.get(this.baseUrl + 'policemen/'+policeManId);
  }
  getRanks(){
    return this.http.get(this.baseUrl + 'ranks');
  }
}
// http://localhost:3000/api/searchPoliceman?policeStationId=5ca22991d11fcf0fa8023c34&policemanName=man

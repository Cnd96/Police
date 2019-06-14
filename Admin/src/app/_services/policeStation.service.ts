import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PoliceStationService {
  
  baseUrl = 'http://localhost:3000/api/';
  constructor(private http: HttpClient) { }
  
getPoliceStations() {
  return this.http.get(this.baseUrl + 'policeStations');
}

getVehicles() {
  return this.http.get('http://localhost:3001/api/' + 'vehicles');
}

test(){
  return this.http.get('http://localhost:8080/WelcomeRESTXML/webresources/generic2/chamal/5');
}
createPoliceStation(policeStation: any){
  return this.http.post(this.baseUrl + 'policeStations', policeStation);
}

searchPoliceStation(str:string){
  console.log(str);
  return this.http.get(this.baseUrl + 'serachPoliceStations?policeStationName='+str);
}
}


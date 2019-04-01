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

createPoliceStation(policeStation: any){
  return this.http.post(this.baseUrl + 'policeStations', policeStation)
}
}


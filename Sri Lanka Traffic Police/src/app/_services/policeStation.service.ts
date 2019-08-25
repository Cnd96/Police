import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PoliceStationService {
  policeStationId=this.authService.decodedToken._id ;
  constructor(private http: HttpClient,private authService:AuthService) { }
  baseUrl = 'http://localhost:3000/api/';
  
  updatePoliceStation(places){
    return this.http.put(this.baseUrl + 'policeStations/'+this.policeStationId, places);
  }
  getPoliceStation(){
    return this.http.get(this.baseUrl + 'policeStations/'+this.policeStationId);
  }
}

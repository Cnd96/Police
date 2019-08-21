import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PoliceStationService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:3000/api/';
  
  updatePoliceStation(places){
    return this.http.put(this.baseUrl + 'fines/'+fine._id, fine);
  }
}

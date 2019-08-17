import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

constructor(private http: HttpClient,private authService: AuthService) { }
baseUrl = 'http://localhost:3000/api/';
  policeStationName=this.authService.decodedToken.policeStationName ;


  getAllFines(pageNumber){
    return this.http.get(this.baseUrl + 'testReport?policeStationName='+this.policeStationName+'&pageNumber='+pageNumber);
  }

  getPlacesOffenceReport(placesData){
    return this.http.post(this.baseUrl+'offenceReport/getByPlace',placesData);
  }
}

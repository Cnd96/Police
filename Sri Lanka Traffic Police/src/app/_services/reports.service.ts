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
  policeStationId=this.authService.decodedToken._id ;

  getAllFines(pageNumber){
    return this.http.get(this.baseUrl + 'testReport?policeStationName='+this.policeStationName+'&pageNumber='+pageNumber);
  }

  getPlacesOffenceReport(placesData){
    return this.http.post(this.baseUrl+'offenceReport/getByPlace',placesData);
  }
  getPlacesDetailedReport(placesData){
    return this.http.post(this.baseUrl+'offenceReport/getByPlace/withTime',placesData);
  }
  getPoliceMenMonthlyPerformanceReport(month,year){
    return this.http.get(this.baseUrl+'policemenReports/getMonthlyTargets?month='+month+'&year='+year+'&policeStationName='+this.policeStationName+'&policeStationId='+this.policeStationId);
  }

  getOffencesReportWithTime(month,year){
    return this.http.get(this.baseUrl+'timeReports/getOffencesByTime?policeStationName='+this.policeStationName+'&month='+month+'&year='+year);
  }

  getOffencesReportWithVehicleType(month,year){
    return this.http.get(this.baseUrl+'vehicleReports/vehicleTypeOffences/ByPoliceStation?policeStationName='+this.policeStationName+'&month='+month+'&year='+year);
  }
}

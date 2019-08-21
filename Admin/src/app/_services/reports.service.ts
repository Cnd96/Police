import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {


baseUrl = 'http://localhost:3000/api/';
constructor(private http: HttpClient) { }

getAllMonthsOffencesReport() {
return this.http.get(this.baseUrl + 'offenceReport/all');
}
getAllFinesReport() {
  return this.http.get(this.baseUrl + 'finesReport/allPoliceStation?year=2019');
  }
getSelectedMonthOffencesReport(month,year) {
  return this.http.get(this.baseUrl + 'offenceReport?month='+month+'&year='+year);
  }

getSelectedMonthPoliceStationIncomeReport(month,year) {
    return this.http.get(this.baseUrl + 'policeStationReports/income?month='+month+'&year='+year);
}
getAllMonthsPoliceStationIncomeReport() {
    return this.http.get(this.baseUrl + 'policeStationReports/income/all');
}

getVehiceData(){
  return this.http.get(this.baseUrl + 'vehicleReports');
}
getVehiceTypeOffencesReport(){
  return this.http.get(this.baseUrl + 'vehicleReports/vehicleTypeOffences');
}
}

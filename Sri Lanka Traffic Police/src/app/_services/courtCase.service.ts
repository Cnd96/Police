import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CourtCaseService {

  constructor(private http: HttpClient,private authService: AuthService) { }
  baseUrl = 'http://localhost:3000/api/';
  policeStationName=this.authService.decodedToken.policeStationName ;

  createCourtCase(courtCase){
    return this.http.post(this.baseUrl+'courtCases',courtCase)
  }

  updateFineToCourtCase(courtCase){
    return this.http.post(this.baseUrl+'courtCases/updateUnpaidToCourtCase',courtCase);
  }

  getUnpaidCourtCasesAllMonths(year){
    return this.http.get(this.baseUrl+'courtCases/policeStation/allmonths/unpaidCourt?policeStationName='+this.policeStationName+'&year='+year);
  }
  getUnpaidCourtCasesSelectedMonth(year,month){
    return this.http.get(this.baseUrl+'courtCases/policeStation/selectedMonth/unpaidCourt?policeStationName='+this.policeStationName+'&year='+year+'&month='+month);
  }
  getPaidCourtCasesAllMonths(year){
    return this.http.get(this.baseUrl+'courtCases/policeStation/allmonths/paidCourt?policeStationName='+this.policeStationName+'&year='+year);
  }
  getPaidCourtCasesSelectedMonth(year,month){
    return this.http.get(this.baseUrl+'courtCases/policeStation/selectedMonth/paidCourt?policeStationName='+this.policeStationName+'&year='+year+'&month='+month);
  }

  updateCourtDate(courtCase:any){
    return this.http.put(this.baseUrl + 'courtCases/CourtDate/'+courtCase.courtId, courtCase);
  }
  settleCourtCase(courtCase:any){
    return this.http.put(this.baseUrl + 'courtCases/SettleCourtCase/'+courtCase.courtId, courtCase);
  }
}

// http://localhost:3000/api/courtCases/policeStation/selectedMonth/unpaidCourt?policeStationName=Panadura&month=7&year=2019

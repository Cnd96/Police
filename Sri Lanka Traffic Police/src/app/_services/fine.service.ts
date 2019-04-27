import { Month } from './../unpaid-fines-table/unpaid-fines-table.component';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FineService {

constructor(private http: HttpClient,private authService: AuthService) { }
  baseUrl = 'http://localhost:3000/api/';
  policeStationName=this.authService.decodedToken.policeStationName ;

  getAllOfficersAllMonthsUnpaidFines(){
    return this.http.get(this.baseUrl + 'fines?policeStationName='+this.policeStationName+'&policeManId=&fineStatus=false&month=');
  }
  getAllOfficersOneMonthUnpaidFines(Month){
    return this.http.get(this.baseUrl + 'fines?policeStationName='+this.policeStationName+'&policeManId=&fineStatus=false&month='+Month);
  }
}
// http://localhost:3000/api/fines?policeStationName=Panadura&policeManId=10015&fineStatus=false
// http://localhost:3000/api/fines?policeStationName=Panadura&policeManId=10015&fineStatus=false&month=4
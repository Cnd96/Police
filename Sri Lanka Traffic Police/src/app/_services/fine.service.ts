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
  unpaidFineID;

  getAllOfficersAllMonthsUnpaidFines(){
    return this.http.get(this.baseUrl + 'fines?policeStationName='+this.policeStationName+'&policeManId=&fineStatus=false&month=&year=2019');
  }
  getAllOfficersOneMonthUnpaidFines(Month,Year){
    return this.http.get(this.baseUrl + 'fines?policeStationName='+this.policeStationName+'&policeManId=&fineStatus=false&month='+Month+'&year='+Year);
  }

  getAllOfficersAllMonthsPaidFines(){
    return this.http.get(this.baseUrl + 'fines?policeStationName='+this.policeStationName+'&policeManId=&fineStatus=true&month=&year=2019');
  }
  getAllOfficersOneMonthPaidFines(Month,Year){
    return this.http.get(this.baseUrl + 'fines?policeStationName='+this.policeStationName+'&policeManId=&fineStatus=true&month='+Month+'&year='+Year);
  }

  getfine(fineId){
    return this.http.get(this.baseUrl + 'fines/'+fineId);
  }

  updateUnpaidFineToPaidFine(fine:any){
    return this.http.put(this.baseUrl + 'fines/'+fine._id, fine);
  }
  
}
// http://localhost:3000/api/fines?policeStationName=Panadura&policeManId=10015&fineStatus=false
// http://localhost:3000/api/fines?policeStationName=Panadura&policeManId=10015&fineStatus=false&month=4
// http://localhost:3000/api/fines/5cc7031dd891c22250c68bc2
// http://localhost:3000/api/fines?policeStationName=Panadura&policeManId=&fineStatus=false&month=&year=2019
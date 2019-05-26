import { Month } from './../unpaid-fines-table/unpaid-fines-table.component';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders ,HttpRequest  } from '@angular/common/http';
import {Headers,RequestOptions,Http} from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class FineService {

constructor(private http: HttpClient,private authService: AuthService) { }
  baseUrl = 'http://localhost:3000/api/';
  policeStationName=this.authService.decodedToken.policeStationName ;
  unpaidFineID;
 
  

  // setHeader(){
  //   let headers=new Headers();
  //   let token=localStorage.getItem('token');
  //   headers.append('PoliceStation-Auth-token', token);
  //   console.log(headers.get('PoliceStation-Auth-token'));
  //   let options = new RequestOptions({ headers: headers });
  //   return options;
  //   // let options = new RequestOptions({ headers: headers });
  // }

  // headers.append('Content-Type', 'application/json');
  // headers.append('authentication', `${student.token}`);
  
  // let options = new RequestOptions({ headers: headers });
  // return this.http
  //     .put(url, JSON.stringify(student), options)

  getOfficerOneMonthUnpaidFines(PoliceId,Month,Year){
    // let headers=new HttpHeaders();
    // let token=localStorage.getItem('token');
    // headers.append('PoliceStation-Auth-token', token);
    // console.log(headers.get('PoliceStation-Auth-token'));
    return this.http.get(this.baseUrl + 'fines?policeStationName='+this.policeStationName+'&policeManId='+PoliceId+'&fineStatus=false&month='+Month+'&year='+Year);
  }
  getOfficerOneMonthPaidFines(PoliceId,Month,Year){
    // let token=localStorage.getItem('token');
    // let headers= new HttpHeaders().append('PoliceStation-Auth-token', token);
    
    return this.http.get(this.baseUrl + 'fines?policeStationName='+this.policeStationName+'&policeManId='+PoliceId+'&fineStatus=true&month='+Month+'&year='+Year);
  }

  getAllOfficersAllMonthsUnpaidFines(Year){
    // let token=localStorage.getItem('token');
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //                            .set('authorization', 'Bearer ' + token);
    // headers = headers.set('authorization', 'Bearer ' + token);
    //  headers = headers.set('PoliceStation-Auth-token', 'dd');
    // headers= headers.set('PoliceStation-Auth-token', token);
    // let options = { headers: headers };
    
         
    // console.log(headers);
    return this.http.get(this.baseUrl + 'fines?policeStationName='+this.policeStationName+'&policeManId=&fineStatus=false&month=&year='+Year);
  }
  getAllOfficersOneMonthUnpaidFines(Month,Year){
    // let token=localStorage.getItem('token');
    // console.log(token);
    // const httpOptions = {
    //     headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //    'PoliceStation-Auth-token': token
    //   })
    // };
    return this.http.get(this.baseUrl + 'fines?policeStationName='+this.policeStationName+'&policeManId=&fineStatus=false&month='+Month+'&year='+Year);
  }

  getAllOfficersAllMonthsPaidFines(Year){
    // let token=localStorage.getItem('token');
    // console.log(token);
    // const httpOptions = {
    //     headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //    'PoliceStation-Auth-token': token
    //   })
    // };
    return this.http.get(this.baseUrl + 'fines?policeStationName='+this.policeStationName+'&policeManId=&fineStatus=true&month=&year='+Year);
  }
  getAllOfficersOneMonthPaidFines(Month,Year){
    return this.http.get(this.baseUrl + 'fines?policeStationName='+this.policeStationName+'&policeManId=&fineStatus=true&month='+Month+'&year='+Year);
  }

  getfine(fineId){
    return this.http.get(this.baseUrl + 'fines/'+fineId);
  }
  // get(){
  //   let headers=new HttpHeaders();
  //   let token=localStorage.getItem('token');
  //   headers.append('PoliceStation-Auth-token', token);
   
  //   return this.http.get('api/fines',{ headers: headers })
  // }

  updateUnpaidFineToPaidFine(fine:any){
    return this.http.put(this.baseUrl + 'fines/'+fine._id, fine);
  }

  recordFineDetails(fine:any){
    return this.http.post(this.baseUrl+'fines',fine);
  }
  
}
// http://localhost:3000/api/fines?policeStationName=Panadura&policeManId=10015&fineStatus=false
// http://localhost:3000/api/fines?policeStationName=Panadura&policeManId=10015&fineStatus=false&month=4
// http://localhost:3000/api/fines/5cc7031dd891c22250c68bc2
// http://localhost:3000/api/fines?policeStationName=Panadura&policeManId=&fineStatus=false&month=&year=2019
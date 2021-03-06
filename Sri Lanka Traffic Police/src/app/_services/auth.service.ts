import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http: HttpClient) { }
jwtHelper=new JwtHelperService();
decodedToken:any;
baseUrl = 'http://localhost:3000/api/';
login(model: any) {
  return this.http.post(this.baseUrl + 'policeStationLogin', model).pipe(
    map((response: any) => {
      const user = response;
      if (user) {
        localStorage.setItem('token', user.token);
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
       console.log(this.decodedToken);
      }
    })
  );
}
getPoliceStationDetails(id){
  return this.http.get(this.baseUrl + 'policeStations/'+id);
}
}



// let headers = new Headers();
// headers.append('Content-Type', 'application/json');
// headers.append('authentication', `${student.token}`);

// let options = new RequestOptions({ headers: headers });
// return this.http
//     .put(url, JSON.stringify(student), options)
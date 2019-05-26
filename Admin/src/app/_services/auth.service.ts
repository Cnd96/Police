import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import {JwtHelper} from 'angular2-jwt'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http: HttpClient) { }


baseUrl = 'http://localhost:3000/api/';
login(model: any) {
  return this.http.post(this.baseUrl + 'login', model).pipe(
    map((response: any) => {
      const user = response;
      if (user) {
        localStorage.setItem('tokenAdmin', user.token);
      }
    })
  );
}

isLogedin(){
  // let jwtHelper=new JwtHelper();
  let token=localStorage.getItem('tokenAdmin');

  if(!token) return false;
  // jwtHelper.

  return true;
}
}



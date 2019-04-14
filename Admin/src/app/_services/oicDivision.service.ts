import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OicDivisionService {

  baseUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }
  
  getOicDivisions() {
   return this.http.get(this.baseUrl + 'oicDivisions');
  }
}

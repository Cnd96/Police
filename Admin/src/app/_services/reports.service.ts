import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {


baseUrl = 'http://localhost:3000/api/';
constructor(private http: HttpClient) { }

getOffenceReport() {
return this.http.get(this.baseUrl + 'finesReport');
}
}

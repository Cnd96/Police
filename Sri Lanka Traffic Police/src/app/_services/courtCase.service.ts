import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourtCaseService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:3000/api/';

  updateFineToCourtCase(courtCase){
    return this.http.post(this.baseUrl+'courtCases/updateUnpaidToCourtCase',courtCase);
  }

}

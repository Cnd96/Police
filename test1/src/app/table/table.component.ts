import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
declare var $;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @ViewChild('dataTable') table;
  dataTable: any;
  policestations:any;
  baseUrl = 'http://localhost:3000/api/';
  constructor(private http: HttpClient) { }
  
getPoliceStations() {
  return this.http.get(this.baseUrl + 'policeStations');
}
  ngOnInit() {
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable();
    this.getPoliceStations()
    .subscribe(response=>{
      this.policestations=response;
      console.log(this.policestations[0].policeStationName);
     
    },(error:Response)=>{
    })
  }

}

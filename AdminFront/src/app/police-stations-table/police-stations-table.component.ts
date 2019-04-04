import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { PoliceStationsTableDataSource } from './police-stations-table-datasource';
import { PoliceStationService } from '../_services/policeStation.service';

@Component({
  selector: 'app-police-stations-table',
  templateUrl: './police-stations-table.component.html',
  styleUrls: ['./police-stations-table.component.css']
})
export class PoliceStationsTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;
  data:any;
  searchKey: string;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['policeStationName', 'address','phoneNo'];
  constructor(private policeStationService:PoliceStationService) { }
  ngOnInit() {
    this.getPoliceStation();
    var pattern= new RegExp("Fort", "i");
    console.log(pattern);
  }

  getPoliceStation(){
    this.policeStationService.getPoliceStations()
    .subscribe(response=>{
      this.data=response;
      console.log(this.data);
      this.dataSource = new PoliceStationsTableDataSource(this.paginator, this.sort, this.data);
    },(error:Response)=>{
    })
  }
  applyFilter(){
    console.log(this.searchKey);
    this.policeStationService.searchPoliceStation(this.searchKey)
    .subscribe(response=>{
      this.data=response;
      console.log(this.data);
      this.dataSource = new PoliceStationsTableDataSource(this.paginator, this.sort, this.data);
    },(error:Response)=>{
    })
  }
}
// this.data=response
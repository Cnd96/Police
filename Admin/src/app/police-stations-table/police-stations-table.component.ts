import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { PoliceStationsTableDataSource } from './police-stations-table-datasource';
import { PoliceStationService } from '../_services/policeStation.service';
import { Router } from '@angular/router';

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
  displayedColumns = ['policeStationName', 'address','phoneNo','oicDivision','actions'];
  constructor(private policeStationService:PoliceStationService,private router:Router) { }
  ngOnInit() {
    this.getPoliceStation();


  }

  getPoliceStation(){
    this.policeStationService.getPoliceStations()
    .subscribe(response=>{
      this.data=response;
      // console.log(this.data);
      this.dataSource = new PoliceStationsTableDataSource(this.paginator, this.sort, this.data);
    },(error:Response)=>{
    })
  }
  searchPoliceStation(){
    console.log(this.searchKey);
    this.policeStationService.searchPoliceStation(this.searchKey)
    .subscribe(response=>{
      this.data=response;
      console.log(this.data);
      this.dataSource = new PoliceStationsTableDataSource(this.paginator, this.sort, this.data);
    },(error:Response)=>{
    })
  }

  onView(policestation){
    this.router.navigate(['/viewPoliceStation',policestation._id]);
    
  }
}
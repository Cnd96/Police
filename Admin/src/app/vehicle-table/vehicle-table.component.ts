import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { VehicleTableDataSource } from './vehicle-table-datasource';
import { PoliceStationService } from '../_services/policeStation.service';

@Component({
  selector: 'app-vehicle-table',
  templateUrl: './vehicle-table.component.html',
  styleUrls: ['./vehicle-table.component.css']
})
export class VehicleTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: VehicleTableDataSource;
  data;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['vehicleNo', 'Regno','type','noOfSeats','manfactureYear'];
  constructor(private policeStationService:PoliceStationService) { }
  ngOnInit() {
    this.getPoliceStation();
  }

  getPoliceStation(){
    this.policeStationService.getVehicles()
    .subscribe(response=>{
      this.data=response;
      // console.log(this.data);
      this.dataSource = new VehicleTableDataSource(this.paginator, this.sort, this.data);
    },(error:Response)=>{
    })
  }
}

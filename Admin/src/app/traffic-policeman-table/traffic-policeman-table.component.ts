
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TrafficPolicemanTableDataSource } from './traffic-policeman-table-datasource';

@Component({
  selector: 'app-traffic-policeman-table',
  templateUrl: './traffic-policeman-table.component.html',
  styleUrls: ['./traffic-policeman-table.component.css']
})
export class TrafficPolicemanTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TrafficPolicemanTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name','phoneNo','rank'];

  ngOnInit() {
    // this.dataSource = new TrafficPolicemanTableDataSource(this.paginator, this.sort);
  }
  displayTrafficPoliceMen(trafficPolicemen){
    console.log(trafficPolicemen);
    this.dataSource = new TrafficPolicemanTableDataSource(this.paginator, this.sort,trafficPolicemen);
  }
}

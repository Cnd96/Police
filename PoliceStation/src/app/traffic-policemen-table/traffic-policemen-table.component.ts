import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TrafficPolicemenTableDataSource } from './traffic-policemen-table-datasource';
import { AuthService } from '../_services/auth.service';
import { TrafficPolicemenService } from '../_services/trafficPolicemen.service';

@Component({
  selector: 'app-traffic-policemen-table',
  templateUrl: './traffic-policemen-table.component.html',
  styleUrls: ['./traffic-policemen-table.component.css']
})
export class TrafficPolicemenTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TrafficPolicemenTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name','phoneNo'];
  constructor(private authService:AuthService,private trafficPolicemenService:TrafficPolicemenService) { }
  ngOnInit() {
    this.dataSource = new TrafficPolicemenTableDataSource(this.paginator, this.sort,this.authService,this.trafficPolicemenService);
  }
}

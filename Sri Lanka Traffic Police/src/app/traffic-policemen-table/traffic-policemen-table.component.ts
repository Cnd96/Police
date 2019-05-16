import { ViewTrafficPolicemanComponent } from './../viewTrafficPoliceman/viewTrafficPoliceman.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TrafficPolicemenTableDataSource } from './traffic-policemen-table-datasource';
import { AuthService } from '../_services/auth.service';
import { TrafficPolicemenService } from '../_services/trafficPolicemen.service';
import { Router } from '@angular/router';
import * as jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'app-traffic-policemen-table',
  templateUrl: './traffic-policemen-table.component.html',
  styleUrls: ['./traffic-policemen-table.component.css']
})
export class TrafficPolicemenTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TrafficPolicemenTableDataSource;
  data:any;
  policeStationId=this.authService.decodedToken._id ;
  searchKey:string;

  displayedColumns = ['id', 'name','phoneNo','rank','actions'];

  constructor(private authService:AuthService,private trafficPolicemenService:TrafficPolicemenService,private router:Router) { }
  ngOnInit() {
    this.getPoliceman();
  }
  

  getPoliceman(){
    this.trafficPolicemenService.getTrafficPolicemen(this.policeStationId)
    .subscribe(response=>{
      this.data=response;
      // console.log(this.data);
      this.dataSource = new TrafficPolicemenTableDataSource(this.paginator, this.sort,this.data);
    },(error:Response)=>{
    })
  }

  searchPoliceman(){
    this.trafficPolicemenService.searchTrafficPolicemen(this.policeStationId,this.searchKey)
    .subscribe(response=>{
      this.data=response;
      // console.log(this.data);
      this.dataSource = new TrafficPolicemenTableDataSource(this.paginator, this.sort,this.data);
    },(error:Response)=>{
    })
  }

  onView(row){
    // this.trafficPolicemenService.policeManId=row._id;
    ViewTrafficPolicemanComponent.policemanId=row._id;
    this.router.navigate(['/viewTrafficPoliceman']);
  }

}

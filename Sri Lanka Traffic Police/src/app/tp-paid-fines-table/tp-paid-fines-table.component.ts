import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TPPaidFinesTableDataSource } from './tp-paid-fines-table-datasource';
import { FineService } from '../_services/fine.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tp-paid-fines-table',
  templateUrl: './tp-paid-fines-table.component.html',
  styleUrls: ['./tp-paid-fines-table.component.css']
})
export class TPPaidFinesTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TPPaidFinesTableDataSource;
  displayedColumns = ['id','license','vehicle','date','place','total'];
  paidFines:any;

  static selectedMonth:any;
  static selectedYear:any;
  static policemanId:any;
  constructor(private finesService:FineService,private router:Router) {
    console.log();
   }
  ngOnInit() {
    this.getPaidfines();
  }

   getPaidfines(){
    let id=TPPaidFinesTableComponent.policemanId; 
    let month=TPPaidFinesTableComponent.selectedMonth;
    let year=TPPaidFinesTableComponent.selectedYear;
    console.log(year);
    this.finesService.getOfficerOneMonthPaidFines(id,month,year)
    .subscribe(response=>{
      this.paidFines=response;
      this.dataSource = new TPPaidFinesTableDataSource(this.paginator, this.sort,response);
    },(error:Response)=>{
      console.log(error);
    })
  }
}

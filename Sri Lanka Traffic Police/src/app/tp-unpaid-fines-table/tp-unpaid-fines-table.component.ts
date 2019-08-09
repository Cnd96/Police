import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TPUnpaidFinesTableDataSource } from './tp-unpaid-fines-table-datasource';
import { FineService } from '../_services/fine.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tp-unpaid-fines-table',
  templateUrl: './tp-unpaid-fines-table.component.html',
  styleUrls: ['./tp-unpaid-fines-table.component.css']
})
export class TPUnpaidFinesTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TPUnpaidFinesTableDataSource;
  displayedColumns = ['id','license','vehicle','date','place','amount'];
  unPaidFines:any;

  static selectedMonth:any;
  static selectedYear:any;
  static policemanId:any;
  constructor(private finesService:FineService,private router:Router) {
    console.log();
   }
  ngOnInit() {
    this.getUnpaidfines();
  }

  getUnpaidfines(){
    let id=TPUnpaidFinesTableComponent.policemanId; 
    let month=TPUnpaidFinesTableComponent.selectedMonth;
    let year=TPUnpaidFinesTableComponent.selectedYear;

    console.log(year);
    this.finesService.getOfficerOneMonthUnpaidFines(id,month,year)
    .subscribe(response=>{
      this.unPaidFines=response;
      this.dataSource = new TPUnpaidFinesTableDataSource(this.paginator, this.sort,response);
    },(error:Response)=>{
      console.log(error);
    })
  }
}

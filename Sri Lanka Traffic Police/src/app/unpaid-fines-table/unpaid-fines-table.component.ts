import { FineService } from './../_services/fine.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { UnpaidFinesTableDataSource } from './unpaid-fines-table-datasource';
import { Router } from '@angular/router';

export interface Month {
  value: string;
  viewValue: string;
}
export interface Year {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-unpaid-fines-table',
  templateUrl: './unpaid-fines-table.component.html',
  styleUrls: ['./unpaid-fines-table.component.css']
})



export class UnpaidFinesTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: UnpaidFinesTableDataSource;
  fines:any;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['fineId','licenseNo','vehicle','policemanName','date','days','amount','actions'];
  
  currentYear=new Date().getFullYear();
  selectedMonth = '';
  selectedYear =this.currentYear.toString();

  years: Year[]=[
    {value: '2019', viewValue: '2019'},
    {value: '2020', viewValue: '2020'},
    {value: '2021', viewValue: '2021'},
  ];
  months: Month[] = [
    {value: '', viewValue: 'All'},
    {value: '1', viewValue: 'January'},
    {value: '2', viewValue: 'February'},
    {value: '3', viewValue: 'March'},
    {value: '4', viewValue: 'April'},
    {value: '5', viewValue: 'May'},
    {value: '6', viewValue: 'June'},
    {value: '7', viewValue: 'July'},
    {value: '8', viewValue: 'August'},
    {value: '9', viewValue: 'September'},
    {value: '10', viewValue: 'Octomber'},
    {value: '11', viewValue: 'November'},
    {value: '12', viewValue: 'December'}

  ];
  
  constructor(private finesService:FineService,private router:Router) {
    console.log();
   }
  ngOnInit() {
    this.getUnpaifines();
  }
  

  getUnpaifines(){
    this.finesService.getAllOfficersAllMonthsUnpaidFines(this.currentYear)
    .subscribe(response=>{
      this.fines=response;
      console.log(response);
      this.dataSource = new UnpaidFinesTableDataSource(this.paginator, this.sort,this.fines);
    },(error:Response)=>{
      console.log(error);
    })
  }
  
  getSelectedYearMonthFines(){
    console.log(this.selectedMonth);
    // console.log(this.selectedYear);
    this.finesService.getAllOfficersOneMonthUnpaidFines(this.selectedMonth,this.selectedYear)
    .subscribe(response=>{
      this.fines=response;
      console.log(response);
      this.dataSource = new UnpaidFinesTableDataSource(this.paginator, this.sort,this.fines);
    },(error:Response)=>{
      console.log(error);
    })
  }
}
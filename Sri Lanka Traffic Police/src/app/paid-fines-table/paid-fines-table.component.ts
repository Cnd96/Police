import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { PaidFinesTableDataSource } from './paid-fines-table-datasource';
import { FineService } from '../_services/fine.service';
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
  selector: 'app-paid-fines-table',
  templateUrl: './paid-fines-table.component.html',
  styleUrls: ['./paid-fines-table.component.css']
})
export class PaidFinesTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: PaidFinesTableDataSource;
  fines:any;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id','license','vehicle','policeman','date','amount','actions'];
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
  
  constructor(private finesService:FineService,private router:Router) { }
  ngOnInit() {
    this.getPaifines();
  }

  getPaifines(){
    this.finesService.getAllOfficersAllMonthsPaidFines(this.currentYear)
    .subscribe(response=>{
      this.fines=response;
      console.log(response);
      this.dataSource = new PaidFinesTableDataSource(this.paginator, this.sort,this.fines);
    },(error:Response)=>{
      console.log(error);
    })
  }
  getSelectedYearMonthFines(){
    // console.log(this.selectedMonth);
    this.finesService.getAllOfficersOneMonthPaidFines(this.selectedMonth,this.selectedYear)
    .subscribe(response=>{
      this.fines=response;
      console.log(response);
      this.dataSource = new PaidFinesTableDataSource(this.paginator, this.sort,this.fines);
    },(error:Response)=>{
      console.log(error);
    })
  }
}

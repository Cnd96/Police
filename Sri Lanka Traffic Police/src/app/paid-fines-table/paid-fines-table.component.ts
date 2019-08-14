import { ViewfineComponent } from './../viewfine/viewfine.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
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
    {value: '0', viewValue: 'January'},
    {value: '1', viewValue: 'February'},
    {value: '2', viewValue: 'March'},
    {value: '3', viewValue: 'April'},
    {value: '4', viewValue: 'May'},
    {value: '5', viewValue: 'June'},
    {value: '6', viewValue: 'July'},
    {value: '7', viewValue: 'August'},
    {value: '8', viewValue: 'September'},
    {value: '9', viewValue: 'Octomber'},
    {value: '10', viewValue: 'November'},
    {value: '11', viewValue: 'December'}

  ];
  
  constructor(private finesService:FineService,private router:Router,private dialog:MatDialog) { }
  ngOnInit() {
    this.getPaifines();
  }

  getPaifines(){
    this.finesService.getAllOfficersAllMonthsPaidFines(this.currentYear)
    .subscribe(response=>{
      this.fines=response;
      // console.log(response);
      this.fines.forEach(function (fine) {
        // console.log(fine.date);
        fine.date=new Date(fine.date).toDateString();
        // fine.date=new Date(fine.date)
        // fine.date==fine.date.toString();
      });
      // console.log(this.fines[0].date);
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
      this.fines.forEach(function (fine) {
        fine.date=new Date(fine.date).toDateString()
      });
      this.dataSource = new PaidFinesTableDataSource(this.paginator, this.sort,this.fines);
    },(error:Response)=>{
      console.log(error);
    })
  }
  createViewfine(fine){
    ViewfineComponent.fine=fine;
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="80%";
    this.dialog.open(ViewfineComponent, dialogConfig);
  }
}

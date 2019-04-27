import { FineService } from './../_services/fine.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { UnpaidFinesTableDataSource } from './unpaid-fines-table-datasource';
import { Router } from '@angular/router';

export interface Month {
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
  data:any;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id','license','vehicle','policeman','date','amount','actions'];
  selectedMonth:String;
  
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
    this.getUnpaifines();
  }
  

  getUnpaifines(){
    this.finesService.getAllOfficersAllMonthsUnpaidFines()
    .subscribe(response=>{
      this.data=response;
      console.log(response);
      this.dataSource = new UnpaidFinesTableDataSource(this.paginator, this.sort,this.data);
    },(error:Response)=>{
      console.log(error);
    })
  }
  
  getMonthFines(){
    // console.log(this.selectedMonth);
    this.finesService.getAllOfficersOneMonthUnpaidFines(this.selectedMonth)
    .subscribe(response=>{
      this.data=response;
      console.log(response);
      this.dataSource = new UnpaidFinesTableDataSource(this.paginator, this.sort,this.data);
    },(error:Response)=>{
      console.log(error);
    })
  }
}
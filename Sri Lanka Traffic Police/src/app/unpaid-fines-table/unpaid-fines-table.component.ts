import { UpdateToCourtCaseComponent } from './../updateToCourtCase/updateToCourtCase.component';
import { ViewfineComponent } from './../viewfine/viewfine.component';
import { map } from 'rxjs/operators';
import { FineService } from './../_services/fine.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
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
  
  constructor(private finesService:FineService,private router:Router,private dialog:MatDialog) {
    console.log();
   }
  ngOnInit() {
    this.getUnpaifines();
  }
  

  getUnpaifines(){
    this.finesService.getAllOfficersAllMonthsUnpaidFines(this.currentYear)
    .subscribe(response=>{
      this.fines=response;
      // console.log(response);

      this.fines.forEach( (fine)=> {
        fine.enableCourtcase=true;
        fine.date=new Date(fine.date).toDateString();
          fine.offences.forEach(offence => {
            if(fine.dateDifference>offence.daysAllowed){
              fine.enableCourtcase=false;
            }
          });

      });
      // console.log(this.fines.date);
      console.log(this.fines);

    this.dataSource = new UnpaidFinesTableDataSource(this.paginator, this.sort,this.fines);
      // console.log(this.dataSource);
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
      console.log(this.fines);
      this.fines.forEach(function (fine) {
        fine.date=new Date(fine.date).toDateString();

 
          fine.enableCourtcase=true;
            fine.offences.forEach(offence => {
              if(fine.dateDifference>offence.daysAllowed){
                fine.enableCourtcase=false;
              }
            });
  
      });
      this.dataSource = new UnpaidFinesTableDataSource(this.paginator, this.sort,this.fines);
    },(error:Response)=>{
      console.log(error);
    })
  }


  createViewfine(fine){
    console.log(fine);
    ViewfineComponent.fine=fine;
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="80%";
    this.dialog.open(ViewfineComponent, dialogConfig);
  }


  createCourtCase(fine){
    UpdateToCourtCaseComponent.fineDetails=fine;
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;

    this.dialog.open(UpdateToCourtCaseComponent, dialogConfig);
  }
}
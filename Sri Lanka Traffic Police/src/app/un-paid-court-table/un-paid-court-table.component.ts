import { CourtCaseService } from './../_services/courtCase.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { UnPaidCourtTableDataSource } from './un-paid-court-table-datasource';
import { Year, Month } from '../unpaid-fines-table/unpaid-fines-table.component';
import { UpdateCourtDateComponent } from '../updateCourtDate/updateCourtDate.component';
import { SettleCourtCaseComponent } from '../settleCourtCase/settleCourtCase.component';

@Component({
  selector: 'app-un-paid-court-table',
  templateUrl: './un-paid-court-table.component.html',
  styleUrls: ['./un-paid-court-table.component.css']
})
export class UnPaidCourtTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: UnPaidCourtTableDataSource;

  displayedColumns = ['courtId','driver','vehicle','date','courtdate','courttime','actions'];

  currentYear=new Date().getFullYear();
  selectedMonth = '';
  selectedYear =this.currentYear.toString();
  courtCases:any;
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
  constructor(private courtCaseService:CourtCaseService,private dialog:MatDialog) {
    console.log();
   }
  
  ngOnInit() {
    this.getUnpaidCourtCases();
  }

  
  getUnpaidCourtCases(){
    this.courtCaseService.getUnpaidCourtCasesAllMonths(this.selectedYear)
      .subscribe(response=>{
        this.courtCases=response;

        this.courtCases.forEach( (courtCase)=> {
          // case.enableCourtcase=true;
          courtCase.date=new Date(courtCase.date).toDateString();
          courtCase.courtHearingDate=new Date(courtCase.courtHearingDate).toDateString();
          

        });
        console.log(this.courtCases);

      this.dataSource = new UnPaidCourtTableDataSource(this.paginator, this.sort,this.courtCases);
        // console.log(this.dataSource);
      },(error:Response)=>{
        console.log(error);
    })
  }

  getSelectedYearMonthCourtCases(){
      if(this.selectedMonth==''){
        this.getUnpaidCourtCases();
      }
      else{
        this.courtCaseService.getUnpaidCourtCasesSelectedMonth(this.selectedYear,this.selectedMonth)
        .subscribe(response=>{
          this.courtCases=response;
          // console.log(this.courtCases);
          this.courtCases.forEach(function (courtCase) {
            courtCase.date=new Date(courtCase.date).toDateString();
            courtCase.courtHearingDate=new Date(courtCase.courtHearingDate).toDateString();
          });
          this.dataSource = new UnPaidCourtTableDataSource(this.paginator, this.sort,this.courtCases);
        },(error:Response)=>{
          console.log(error);
        })
      }
      
  }

  updateCourtDate(courtCase){
    UpdateCourtDateComponent.courtCase=courtCase;
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;

    this.dialog.open(UpdateCourtDateComponent, dialogConfig);
  }
  settleCourtCase(courtCase){
    SettleCourtCaseComponent.courtCase=courtCase;
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;

    this.dialog.open(SettleCourtCaseComponent, dialogConfig);
  }
}

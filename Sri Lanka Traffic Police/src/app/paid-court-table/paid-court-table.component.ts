import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { PaidCourtTableDataSource } from './paid-court-table-datasource';
import { Year, Month } from '../unpaid-fines-table/unpaid-fines-table.component';
import { CourtCaseService } from '../_services/courtCase.service';

@Component({
  selector: 'app-paid-court-table',
  templateUrl: './paid-court-table.component.html',
  styleUrls: ['./paid-court-table.component.css']
})
export class PaidCourtTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: PaidCourtTableDataSource;
  displayedColumns = ['courtId','driver','vehicle','date','policemanName','amount','actions'];

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
    this.courtCaseService.getPaidCourtCasesAllMonths(this.selectedYear)
      .subscribe(response=>{
        this.courtCases=response;

        this.courtCases.forEach( (courtCase)=> {
          // case.enableCourtcase=true;
          courtCase.date=new Date(courtCase.date).toDateString();
          courtCase.courtHearingDate=new Date(courtCase.courtHearingDate).toDateString();
          

        });
        console.log(this.courtCases);

      this.dataSource = new PaidCourtTableDataSource(this.paginator, this.sort,this.courtCases);
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
        this.courtCaseService.getPaidCourtCasesSelectedMonth(this.selectedYear,this.selectedMonth)
        .subscribe(response=>{
          this.courtCases=response;
          // console.log(this.courtCases);
          this.courtCases.forEach(function (courtCase) {
            courtCase.date=new Date(courtCase.date).toDateString();
            courtCase.courtHearingDate=new Date(courtCase.courtHearingDate).toDateString();
          });
          this.dataSource = new PaidCourtTableDataSource(this.paginator, this.sort,this.courtCases);
        },(error:Response)=>{
          console.log(error);
        })
      }
      
  }


}

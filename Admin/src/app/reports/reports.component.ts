import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportsService } from '../_services/reports.service';
export interface Year {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})

export class ReportsComponent implements OnInit {

  constructor(private router :Router,private reportService:ReportsService) { }

  currentYear=new Date().getFullYear();
  selectedYear =this.currentYear.toString();

  years: Year[]=[
    {value: '2019', viewValue: '2019'},
    {value: '2020', viewValue: '2020'},
    {value: '2021', viewValue: '2021'},
  ];
  finesData:any;
  public primaryXAxis: Object;
  public chartData: Object[];
  public title: string;
  public primaryYAxis: Object;
  ngOnInit() {
  
    this.reportService.getAllFinesReport()
    .subscribe((response)=>{
      this.finesData=response;
      this.chartData =this.finesData;
      this.primaryXAxis = { valueType: 'Category',title: 'Month' };
      this.primaryYAxis = {title: 'Number of Fines'};
      this.title = 'Fines 2019';
      },
      (error)=>console.log(error)
    );
    
  }

  ShowOffenceReportComponent(){
    this.router.navigate(['/reports/offenceReport']);
  }
}

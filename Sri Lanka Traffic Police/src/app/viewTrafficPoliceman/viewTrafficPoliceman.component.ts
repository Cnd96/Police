import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit ,ViewChild } from '@angular/core';
import { TrafficPolicemenService } from '../_services/trafficPolicemen.service';
import { Year, Month } from '../unpaid-fines-table/unpaid-fines-table.component';
import { FineService } from '../_services/fine.service';
import * as jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas'; 
import { TPPaidFinesTableComponent } from '../tp-paid-fines-table/tp-paid-fines-table.component';
import { TPUnpaidFinesTableComponent } from '../tp-unpaid-fines-table/tp-unpaid-fines-table.component';

@Component({
  selector: 'app-viewTrafficPoliceman',
  templateUrl: './viewTrafficPoliceman.component.html',
  styleUrls: ['./viewTrafficPoliceman.component.css']
})
export class ViewTrafficPolicemanComponent implements OnInit {
  @ViewChild(TPUnpaidFinesTableComponent ) TPUnpaidChild: TPUnpaidFinesTableComponent ; 
  @ViewChild(TPPaidFinesTableComponent ) TPPaidChild: TPPaidFinesTableComponent ; 
  policeStationName=this.authService.decodedToken.policeStationName ;
  unPaidFines:any;
  paidFines:any;
  currentYear=new Date().getFullYear();
  currentMonth=(new Date().getMonth())+1;
  selectedMonth = this.currentMonth.toString();
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

  // static policemanId:any;
  policemanId:any;
  trafficPoliceman:any;
  
  constructor(private trafficPolicemenService:TrafficPolicemenService,
    private route :ActivatedRoute ,private authService: AuthService,private finesService:FineService) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params=>{
        this.policemanId= params.get('trafficPolicemanId');
      })

    // console.log(id);
    this.trafficPoliceman= this.trafficPolicemenService.getTrafficPoliceman(this.policemanId)
    .subscribe(response=>{
      // console.log(response);
      this.trafficPoliceman=response;
    },(error:Response)=>{
    })
    this.getUnpaidfines();
    this.getPaidfines();
  }
  
  getUnpaidfines(){
    TPUnpaidFinesTableComponent.policemanId=this.policemanId;
    TPUnpaidFinesTableComponent.selectedMonth=this.selectedMonth;
    TPUnpaidFinesTableComponent.selectedYear=this.selectedYear;
    this.TPUnpaidChild.getUnpaidfines();
  }
  getPaidfines(){
    TPPaidFinesTableComponent.policemanId=this.policemanId;
    TPPaidFinesTableComponent.selectedMonth=this.selectedMonth;
    TPPaidFinesTableComponent.selectedYear=this.selectedYear;
    this.TPPaidChild.getPaidfines();
   
  }

  getSelectedYearMonthFines(){
   this.getPaidfines();
   this.getUnpaidfines();
  }

}

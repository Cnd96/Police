import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/_services/reports.service';
import { Month, Year } from '../offenceReport/offenceReport.component';
import * as jspdf from 'jspdf'; 
import html2canvas from 'html2canvas'; 
import 'jspdf-autotable';

@Component({
  selector: 'app-policeStationIncome',
  templateUrl: './policeStationIncome.component.html',
  styleUrls: ['./policeStationIncome.component.css']
})
export class PoliceStationIncomeComponent implements OnInit {
  constructor(private reportsService:ReportsService) { }

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
   
  allMonthsPoliceStationData=[];
  policeStations:any;
  ngOnInit() {

    this.getAllMonthsIncome()
  }

  getAllMonthsIncome(){
    this.reportsService.getAllMonthsPoliceStationIncomeReport()
    .subscribe(response=>{
      this.policeStations=response;
      let amount=0;
      this.policeStations.forEach(policeStation => {
        let policeStationData=[];
        policeStationData.push(policeStation.policeStationName);
        policeStationData.push(policeStation.oicDivision);
        policeStationData.push(policeStation.phoneNo);
        policeStationData.push(policeStation.total);
        this.allMonthsPoliceStationData.push(policeStationData);
        amount+=policeStation.total;
      });
      this.allMonthsPoliceStationData.push(["","","Total",amount])
      console.log(this.allMonthsPoliceStationData);
    },(error:Response)=>{
    })
  }
  
  public genarateAllMonthsIncomeReport()  
  {  
    let doc = new jspdf();
    let head = [['Police Station Name', 'Oic Division', 'Telephone No','Amount']];
    let offenceData = this.allMonthsPoliceStationData;
    doc.autoTable({
        head: head,
        body: offenceData,
        margin: {top: 45},
        
        headStyles: {
          fontSize: 12
      },
      footStyles: {
          fontSize: 15
      },
      bodyStyles: {
        fontSize: 9,
      },
      didDrawPage: function (data) {
         // Header
         doc.setFontSize(20);
         doc.setTextColor(40);
         doc.setFontStyle('normal');
         doc.text("Sri Lanka Traffic Police", data.settings.margin.left , 22);
         doc.setFontSize(18);
         doc.text("Report on Police Station Income ", data.settings.margin.left , 33);
         //set page number
        // Footer
        var str = "Page " + doc.internal.getNumberOfPages()
        if (typeof doc.putTotalPages === 'function') {
            str = str ;
        }
        doc.setFontSize(10);

        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 10);
    },
    });
    doc.save('Income Report.pdf'); 

  } 



   genarateSelectedMonthIncomeReport(){

    let monthInString=this.months[this.selectedMonth].viewValue;
    let yearInString=this.selectedYear;
 

    let monthIncomedata=[];
    this.reportsService.getSelectedMonthPoliceStationIncomeReport(this.selectedMonth,this.selectedYear)
        .subscribe(response=>{
          this.policeStations=response;
          console.log(response);
          let amount=0;
      
          this.policeStations.forEach(policeStation => {
            let policeStationData=[];
            policeStationData.push(policeStation.policeStationName);
            policeStationData.push(policeStation.oicDivision);
            policeStationData.push(policeStation.phoneNo);
            policeStationData.push(policeStation.total);
            monthIncomedata.push(policeStationData);
            amount+=policeStation.total;
          });
          monthIncomedata.push(["","","Total",amount])
          console.log(monthIncomedata);
          

          //creating report
          let doc = new jspdf();
          let head = [['Police Station Name', 'Oic Division', 'Telephone No','Amount']];
          
          doc.autoTable({
              head: head,
              body: monthIncomedata,
              margin: {top: 45},
              
              headStyles: {
                fontSize: 12
            },
            footStyles: {
                fontSize: 15
            },
            bodyStyles: {
              fontSize: 9,
            },
            didDrawPage: function (data) {
              // Header
              doc.setFontSize(20);
              doc.setTextColor(40);
              doc.setFontStyle('normal');
              doc.text("Sri Lanka Traffic Police", data.settings.margin.left , 22);
              doc.setFontSize(18);
              doc.text("Report on Monthly Income of Police Stations."+monthInString+" of "+yearInString, data.settings.margin.left , 33);
              //set page number
              // Footer
              var str = "Page " + doc.internal.getNumberOfPages()
              if (typeof doc.putTotalPages === 'function') {
                  str = str ;
              }
              doc.setFontSize(10);

              var pageSize = doc.internal.pageSize;
              var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
              doc.text(str, data.settings.margin.left, pageHeight - 10);
          },
          });
          doc.save(monthInString+' income report.pdf');
        },(error:Response)=>{ 
    });
  }



}

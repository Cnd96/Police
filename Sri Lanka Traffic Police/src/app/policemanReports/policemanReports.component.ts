import { Component, OnInit } from '@angular/core';
import { Year, Month } from '../unpaid-fines-table/unpaid-fines-table.component';
import { ReportsService } from '../_services/reports.service';
import * as jspdf from 'jspdf'; 
import 'jspdf-autotable';
import { AuthService } from '../_services/auth.service';
@Component({
  selector: 'app-policemanReports',
  templateUrl: './policemanReports.component.html',
  styleUrls: ['./policemanReports.component.css']
})
export class PolicemanReportsComponent implements OnInit {
  policeStationName=this.authService.decodedToken.policeStationName ;
  currentYear=new Date().getFullYear();
  selectedMonth = new Date().getMonth().toString();
  selectedYear =this.currentYear.toString();

  years: Year[]=[
    {value: '2019', viewValue: '2019'},
    {value: '2020', viewValue: '2020'},
    {value: '2021', viewValue: '2021'},
  ];
  months: Month[] = [
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

  policeMenData:any;
  constructor(private reportService:ReportsService,private authService:AuthService) { }

  ngOnInit() {
  }
  
  submit(){

    this.reportService.getPoliceMenMonthlyPerformanceReport(this.selectedMonth,this.selectedYear).subscribe(response=>{
      this.policeMenData=response;
      console.log(this.policeMenData)
      this.genarateSelectedMonthPerformanceReport();
    },(error:Response)=>{
      
      if(error.status===400){
        alert('Report not found.')
        console.log(error);
      }
      else alert('Unexpected error found');
    })   
  }

  
  genarateSelectedMonthPerformanceReport(){

    let monthInString=this.months[parseInt(this.selectedMonth)].viewValue;
    let yearInString=this.selectedYear;

    let monthlyPerformancedata=[];

     
    this.policeMenData.forEach(policeman => {
      let policemanToInsert=[];
      policemanToInsert.push(policeman._id);
      policemanToInsert.push(policeman.name);
      policemanToInsert.push(policeman.rank);
      policemanToInsert.push(policeman.fines);
      policemanToInsert.push(policeman.courtCases);
      policemanToInsert.push(policeman.courtCases+policeman.fines);
      monthlyPerformancedata.push(policemanToInsert)
    });


          let doc = new jspdf();
          doc.setFontSize(22);
          doc.setTextColor(40);
          doc.setFontStyle('normal');
          doc.text("Sri Lanka Traffic Police", 65, 25);
          doc.setFontSize(21);
          doc.text(this.policeStationName+" Police Station", 65, 35);
          doc.setFontSize(19);
          doc.text("Report on Policeman Monthly Performance",14 , 46);  
          doc.text("Month :"+monthInString+' Year :'+yearInString,14 , 54);  
          let head = [['Name', 'ID','Rank', 'Fines','Court Cases','Total']];
          
          doc.autoTable({
              head: head,
              body: monthlyPerformancedata,
              margin: {top: 60},
              theme: 'grid',
              headStyles: {
              
                fontSize: 12
            },
            footStyles: {
                fontSize: 15
            },
            bodyStyles: {
              fontSize: 10,
            },
            didDrawPage: function (data) {
           
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
          doc.save(monthInString+' performance report.pdf');
        
    
  }

}

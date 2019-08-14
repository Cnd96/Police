
import { ReportsService } from './../../_services/reports.service';
import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf'; 
import html2canvas from 'html2canvas'; 
import 'jspdf-autotable';
import { autoTable as AutoTable } from 'jspdf-autotable';
export interface Month {
  value: string;
  viewValue: string;
}
export interface Year {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-offenceReport',
  templateUrl: './offenceReport.component.html',
  styleUrls: ['./offenceReport.component.css']
})
export class OffenceReportComponent implements OnInit {
  constructor(private reportsService:ReportsService) { }

  currentYear=new Date().getFullYear();
  currentMonth=(new Date().getMonth())
  
  ;
  selectedMonth = this.currentMonth.toString();
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
  
  
  allOffenceData=[];
  offences:any;
  ngOnInit() {
    this.getAllOffences()
  }

  getAllOffences(){
    this.reportsService.getAllMonthsOffencesReport()
    .subscribe(response=>{
      this.offences=response;
      let totalOccurence=0;
      this.offences.forEach(offence => {
        let offenceOneData=[];
        offenceOneData.push(offence.sectionOfAct);
        offenceOneData.push(offence.provision);
        offenceOneData.push(offence.total);
        this.allOffenceData.push(offenceOneData);
        totalOccurence+=offence.total;
      });
      this.allOffenceData.push(["","Total",totalOccurence])
      console.log(this.allOffenceData);
    },(error:Response)=>{
    })
  }

  public genarateAllOffencesReport()  
  {  
    let doc = new jspdf();
    let head = [['Section of Act', 'Provision', 'Total']];
    let offenceData = this.allOffenceData;
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
         doc.text("Report on All Offences ", data.settings.margin.left , 33);
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
    doc.save('All Offence Report.pdf'); 
    // var print = document.getElementById('contentToConvert');  
    // html2canvas(print).then(canvas => { 
      
        // const contentDataURL = canvas.toDataURL('image/png')  
 
    // 
    
    // var imgWidth = 200; 
    // var pageHeight = 275;  
    // var imgHeight = canvas.height * imgWidth / canvas.width;
    // var heightLeft = imgHeight;
    
    // var position = 0;

    // doc.addImage(contentDataURL, 'PNG', 10, 10, imgWidth, imgHeight);
    // heightLeft -= pageHeight;

    // while (heightLeft >= 0) {
    //   position = heightLeft - imgHeight;
    //   doc.addPage();
    //   doc.addImage(contentDataURL, 'PNG', 10, 10, imgWidth, imgHeight);
    //   heightLeft -= pageHeight;
    // }
      // });  
  } 



   genarateSelectedMonthReport(){

    let monthInString=this.months[parseInt(this.selectedMonth)+1].viewValue;
    let yearInString=this.selectedYear;
 

    let monthOffencedata=[];
    this.reportsService.getSelectedMonthOffencesReport(this.selectedMonth,this.selectedYear)
        .subscribe(response=>{
          this.offences=response;
          let totalOccurence=0;
          this.offences.forEach(offence => {
            let offenceOneData=[];
            offenceOneData.push(offence.sectionOfAct);
            offenceOneData.push(offence.provision);
            offenceOneData.push(offence.total);
            monthOffencedata.push(offenceOneData);
            totalOccurence+=offence.total;
          });
          monthOffencedata.push(["","Total",totalOccurence])
          console.log(monthOffencedata);
          

          //creating report
          let doc = new jspdf();
          let head = [['Section of Act', 'Provision', 'Total']];
          
          doc.autoTable({
              head: head,
              body: monthOffencedata,
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
              doc.text("Report on Monthly Offences."+monthInString+" of "+yearInString, data.settings.margin.left , 33);
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
          doc.save(monthInString+' offence report.pdf');
        },(error:Response)=>{ 
    });
  }






}

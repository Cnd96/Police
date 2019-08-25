import { Component, OnInit } from '@angular/core';
import { Year, Month } from '../unpaid-fines-table/unpaid-fines-table.component';
import { ReportsService } from '../_services/reports.service';
import { AuthService } from '../_services/auth.service';
import * as jspdf from 'jspdf'; 
import html2canvas from 'html2canvas'; 
import 'jspdf-autotable';
@Component({
  selector: 'app-timereports',
  templateUrl: './timereports.component.html',
  styleUrls: ['./timereports.component.css']
})
export class TimereportsComponent implements OnInit {
  policeStationName=this.authService.decodedToken.policeStationName ;
  currentYear=new Date().getFullYear();
  selectedMonth = new Date().getMonth().toString();
  selectedYear =this.currentYear.toString();
  selectedMonthForVehicleType=new Date().getMonth().toString();
  selectedYearForVehicleType=this.currentYear.toString();

  provisionName=[];
  offencesWithTimeData:any;
  vehicleTypeData:any;
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

  constructor(private reportService:ReportsService,private authService:AuthService) { }

  ngOnInit() {
  }

  submit(){
    this.reportService.getOffencesReportWithTime(this.selectedMonth,this.selectedYear).subscribe(response=>{
 
    this.offencesWithTimeData=response
    this.generateTimeReport()
    },(error:Response)=>{
      
      if(error.status===400){
        alert('Report not found.')
        console.log(error);
      }
      else alert('Unexpected error found');
    })  
  }

  generateTimeReport(){
    let monthInString=this.months[parseInt(this.selectedMonth)].viewValue;
    let yearInString=this.selectedYear;

    this.provisionName=[];
    let offenceDataToEnter=[];
    this.offencesWithTimeData.forEach(offence => {
      // console.log(offence.timeData)
      let offenceOccurence=0 
          offence.timeData.forEach(time => {
            let dataToInsert=[];
            // dataToInsert.push(offence.provision);
            this.provisionName.push(offence.provision);
            dataToInsert.push(time.time);
            dataToInsert.push(time.total);
            offenceOccurence+= time.total;
            offenceDataToEnter.push(dataToInsert);
          });
          offenceDataToEnter.push(["Total",offenceOccurence])
    });

    let doc = new jspdf();


    let head = [['Provision', 'Time of the day','Total']];
    doc.setFontSize(22);
    doc.setTextColor(40);
    doc.setFontStyle('normal');
    doc.text("Sri Lanka Traffic Police", 65, 25);
    doc.setFontSize(21);
    doc.text(this.policeStationName+" Police Station", 65, 35);
    doc.setFontSize(16);
    doc.text("Report on offences with time",14 , 44);    
    doc.text("Month-"+monthInString+' Year-'+yearInString,14 , 52);

    offenceDataToEnter= offenceDataToEnter.map(row => Object.keys(row).map(key => row[key]));
    for (let i = 0; i < offenceDataToEnter.length; i++) {
      let row = offenceDataToEnter[i];
      if (i % 25 === 0) {
        console.log(row);
      
          row.unshift({rowSpan: 25, content:this.provisionName[i], styles: {valign: 'middle', halign: 'left'}});
      }
    }
  //  firstPlacedataToInsert.push(["","Total",firstPlace.totalOffences])
    doc.autoTable({
        head: head,
        body: offenceDataToEnter,
        startY:55,
        theme: 'grid',
        headStyles: {
          fontSize: 8
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

    doc.save('Time Report.pdf');
  }


  DowloadVehicleTypeReport(){
    console.log(this.selectedMonthForVehicleType+","+this.selectedYearForVehicleType);
    this.reportService.getOffencesReportWithVehicleType(this.selectedMonthForVehicleType,this.selectedYearForVehicleType).subscribe(response=>{
      console.log(response);
      this.vehicleTypeData=response
      this.generateVehicleTypeReport()
      },(error:Response)=>{
        
        if(error.status===400){
          alert('Report not found.')
          console.log(error);
        }
        else alert('Unexpected error found');
      })  
  }

  generateVehicleTypeReport(){
    let monthInString=this.months[parseInt(this.selectedMonth)].viewValue;
    let yearInString=this.selectedYear;
    let doc = new jspdf();

    this.provisionName=[];
    let reportData=[];
    console.log(this.vehicleTypeData);
    this.vehicleTypeData.forEach(element => {
      element.vehicleTypes.forEach(vehicleType => {
        let vehicleTypeData=[];
        this.provisionName.push(element.provision);
        vehicleTypeData.push(vehicleType.name);
        vehicleTypeData.push(vehicleType.total);
        reportData.push(vehicleTypeData);
      });

    });
    // Header
    doc.setFontSize(22);
    doc.setTextColor(40);
    doc.setFontStyle('normal');
    doc.text("Sri Lanka Traffic Police", 65, 25);
    doc.setFontSize(21);
    doc.text(this.policeStationName+" Police Station", 65, 35);
    doc.setFontSize(16);
    doc.text("Report on offences with vehicle type",14 , 43);    
    doc.text("Month-"+monthInString+' Year-'+yearInString,125, 43);

    reportData= reportData.map(row => Object.keys(row).map(key => row[key]));
   

    for (let i = 0; i < reportData.length; i++) {
            let row = reportData[i];
            if (i % 7 === 0) {
              console.log(i);
                row.unshift({rowSpan: 7, content: this.provisionName[i], styles: {valign: 'middle', halign: 'left'}});
            }
      }
      let head = [['Provision', 'Vehicle Type','Total Occurence']];


      doc.autoTable({
          head: head,
          body: reportData,
          startY:45,
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

      
      doc.save('Report.pdf');
  }
}

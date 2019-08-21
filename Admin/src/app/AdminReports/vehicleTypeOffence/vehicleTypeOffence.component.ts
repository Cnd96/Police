import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/_services/reports.service';
import * as jspdf from 'jspdf'; 
import html2canvas from 'html2canvas'; 
import 'jspdf-autotable';
@Component({
  selector: 'app-vehicleTypeOffence',
  templateUrl: './vehicleTypeOffence.component.html',
  styleUrls: ['./vehicleTypeOffence.component.css']
})
export class VehicleTypeOffenceComponent implements OnInit {

  data:any;
  reportData=[];
  provisionName=[];
  constructor(private reportsService:ReportsService) { }

  ngOnInit() {
  }

  submit(){
    this.reportsService.getVehiceTypeOffencesReport()
      .subscribe(response=>{
        this.data=response;
        this.data.forEach(element => {
          element.vehicleTypes.forEach(vehicleType => {
            let vehicleTypeData=[];
            this.provisionName.push(element.provision);
            vehicleTypeData.push(vehicleType.name);
            vehicleTypeData.push(vehicleType.total);
            this.reportData.push(vehicleTypeData);
          });

        });
        this.genaratePlaceOffencesReport();
        
    },(error:Response)=>{
    })
  }

  genaratePlaceOffencesReport(){

    // console.log();
             let doc = new jspdf();
            // Header
            doc.setFontSize(22);
            doc.setTextColor(40);
            
            doc.setFontStyle('normal');
            doc.text("Sri Lanka Traffic Police", 65, 25,);
            doc.setFontSize(19);
            doc.text("Report on Vehicle Types.",14 , 38);
            this.reportData= this.reportData.map(row => Object.keys(row).map(key => row[key]));
           

            for (var i = 0; i < this.reportData.length; i++) {
                    let row = this.reportData[i];
                    if (i % 7 === 0) {
                      console.log(i);
                        row.unshift({rowSpan: 7, content: this.provisionName[i], styles: {valign: 'middle', halign: 'left'}});
                    }
              }
              let head = [['Provision', 'Vehicle Type','Total Occurence']];
    
    
              doc.autoTable({
                  head: head,
                  body: this.reportData,
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

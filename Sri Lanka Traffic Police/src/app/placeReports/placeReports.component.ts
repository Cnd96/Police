
import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../_services/reports.service';
import { AuthService } from '../_services/auth.service';
import * as jspdf from 'jspdf'; 
import html2canvas from 'html2canvas'; 
import 'jspdf-autotable';
import { autoTable as AutoTable } from 'jspdf-autotable';
@Component({
  selector: 'app-placeReports',
  templateUrl: './placeReports.component.html',
  styleUrls: ['./placeReports.component.css']
})
export class PlaceReportsComponent implements OnInit {
  policeStationName=this.authService.decodedToken.policeStationName ;

  place='';
  places=[];
  reportdata=[];
  data:any;
  constructor(private authService:AuthService,private reportService:ReportsService) { }

  ngOnInit() {
  }
  remove(place){
    console.log(place);
    let index = this.places.indexOf(place);
    if (index > -1) {
      this.places.splice(index, 1);
    }
  }
  add(){
  console.log(this.place);
  this.places.push(this.place.toLowerCase());
  this.place='';
  console.log(this.places);
  }
  submit(){
    let placesData={
      policeStation:this.policeStationName,
      places:this.places
    }
    
    this.reportService.getPlacesOffenceReport(placesData).subscribe(response=>{

      this.data=response;
      this.data.forEach(data => {
        let dataToInsert=[];
        dataToInsert.push(data.name);
        dataToInsert.push(data.noOffences);
       this.reportdata.push(dataToInsert);
      });
      this.genaratePlaceOffencesReport();
    },(error:Response)=>{
      
      if(error.status===400){
        alert('Fine not exist.')
        console.log(error);
      }
      else alert('Unexpected error found');
    })    
  }

  

  genaratePlaceOffencesReport(){


          let doc = new jspdf();
          let head = [['Place', 'Total']];
          
          doc.autoTable({
              head: head,
              body: this.reportdata,
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
              doc.text("Report on Monthly Offences.", data.settings.margin.left , 33);
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
          doc.save(' offence report.pdf');
    
  }

}

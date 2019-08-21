
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

// console.log();
          let doc = new jspdf();

           

          let head = [['Section of Act', 'Provision','Total']];

          let firstPlacedataToInsert=[];
          let firstPlace=this.data[0];
          doc.setFontSize(22);
              doc.setTextColor(40);
              doc.setFontStyle('normal');
              doc.text("Sri Lanka Traffic Police", 65, 25);
              doc.setFontSize(21);
              doc.text(this.policeStationName+" Police Station", 65, 35);
              doc.setFontSize(19);
              doc.text("Report on Places and Offences",14 , 44);
          doc.text("Place-"+firstPlace.name,14 , 52);

          firstPlace.totalOffences=0
          firstPlace.offencesData.forEach(offence => {
                let dataToInsert=[];
                dataToInsert.push(offence.sectionOfAct);
                dataToInsert.push(offence.provision);
                dataToInsert.push(offence.total);
                firstPlace.totalOffences+= offence.total;
                firstPlacedataToInsert.push(dataToInsert);
         });
         firstPlacedataToInsert.push(["","Total",firstPlace.totalOffences])
          doc.autoTable({
              head: head,
              body: firstPlacedataToInsert,
              startY:55,
              theme: 'grid',
              headStyles: {
                fontSize: 10
            },
            footStyles: {
                fontSize: 15
            },
            bodyStyles: {
              fontSize: 9,
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

          for(let i=1;i<this.data.length;i++){
            let placedataToInsert=[];
            let place=this.data[i];
            doc.addPage();
            doc.text(14 , 25,"Place-"+place.name);
            // doc.text("Place-"+place.name,14 , 310);
            place.totalOffences=0;
            place.offencesData.forEach(offence => {
                  let dataToInsert=[];
                  dataToInsert.push(offence.sectionOfAct);
                  dataToInsert.push(offence.provision);
                  dataToInsert.push(offence.total);
                  place.totalOffences+= offence.total;
                  placedataToInsert.push(dataToInsert);
           });
           placedataToInsert.push(["","Total",place.totalOffences])
            doc.autoTable({
                head: head,
                body: placedataToInsert,
                margin: {top: 35},
                theme: 'grid',
                headStyles: {
                  fontSize: 10
              },
              footStyles: {
                  fontSize: 15
              },
              bodyStyles: {
                fontSize: 9,
              },
              didDrawPage: function (data) {
               // Header
              //  doc.setFontSize(22);
              //  doc.setTextColor(40);
              //  doc.setFontStyle('normal');
              //  doc.text("Sri Lanka Traffic Police", 14, 25);
              //  doc.setFontSize(19);
              //  doc.text("Report on Places.",14 , 35);
              //  doc.text("Place :"+place.name,14 , 43);
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
          }
          doc.save('Place report.pdf');
    
  }

}

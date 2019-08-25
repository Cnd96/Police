

import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../_services/reports.service';
import { AuthService } from '../_services/auth.service';
import * as jspdf from 'jspdf'; 
import html2canvas from 'html2canvas'; 
import 'jspdf-autotable';
import { autoTable as AutoTable } from 'jspdf-autotable';
import { PoliceStationService } from '../_services/policeStation.service';
@Component({
  selector: 'app-placeReports',
  templateUrl: './placeReports.component.html',
  styleUrls: ['./placeReports.component.css']
})
export class PlaceReportsComponent implements OnInit {
  policeStationName=this.authService.decodedToken.policeStationName ;

  detailedPlace:any;
  provisionName=[];
  policeStation:any;
  place='';
  places=[];
  reportdata=[];
  data:any;
  constructor(private authService:AuthService,private reportService:ReportsService,private policeStationService: PoliceStationService) { }

  ngOnInit() {
    this.getPlacesOfPoliceStation();
  }
  remove(place){
    console.log(place);
    let index = this.places.indexOf(place);
    if (index > -1) {
      this.places.splice(index, 1);
    }
  }

  getPlacesOfPoliceStation(){
    this.policeStationService.getPoliceStation().subscribe(response=>{
      this.policeStation=response;
      this.places=this.policeStation.places;
      console.log(this.policeStation)
      this.genaratePlaceOffencesReport();
    },(error:Response)=>{
      
      if(error.status===400){
        alert('Places not found.')
        console.log(error);
      }
      else alert('Unexpected error found');
    }) 
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
    console.log(placesData);
    this.policeStationService.updatePoliceStation(placesData).subscribe(response=>{
      console.log(response)
                this.reportService.getPlacesOffenceReport(placesData).subscribe(response=>{
                  this.data=response;
                  console.log(this.data)
                  this.genaratePlaceOffencesReport();
                },(error:Response)=>{
                  
                  if(error.status===400){
                    alert('Places not found.')
                    console.log(error);
                  }
                  else alert('Unexpected error found');
                }) 
    },(error:Response)=>{
      
      if(error.status===400){
        alert('Police Station not found.')
        console.log(error);
      }
      else alert('Unexpected error found');
    })    
       
  }

  

  genaratePlaceOffencesReport(){
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


  getOnePlaceData(place){
  
    let placesToSend=[];
    placesToSend.push(place);
    let placesData={
      policeStation:this.policeStationName,
      places:placesToSend
    }
    this.reportService.getPlacesDetailedReport(placesData).subscribe(response=>{
      console.log(response)
      this.detailedPlace=response
      this.genarateDetailedReport(this.detailedPlace);
    },(error:Response)=>{
      
      if(error.status===400){
        alert('Report not found.')
        console.log(error);
      }
      else alert('Unexpected error found');
    }) 
  }
  
  genarateDetailedReport(reportData){
    this.provisionName=[];
    let doc = new jspdf();

    let head = [['Provision', 'Time (Between 1 hour)','Total']];

    let placedataToInsert=[];
    let place=reportData[0];
    doc.setFontSize(22);
    doc.setTextColor(40);
    doc.setFontStyle('normal');
    doc.text("Sri Lanka Traffic Police", 65, 25);
    doc.setFontSize(21);
    doc.text(this.policeStationName+" Police Station", 65, 35);
    doc.setFontSize(19);
    doc.text("Report on Place Detailed Report",14 , 44);    
    doc.text("Place-"+place.name,14 , 52);

  console.log(place)
    place.offencesData.forEach(offence => {
      console.log(offence.timeData)
      let offenceOccurence=0 
          offence.timeData.forEach(time => {
            let dataToInsert=[];
            // dataToInsert.push(offence.provision);
            this.provisionName.push(offence.provision);
            dataToInsert.push(time.time);
            dataToInsert.push(time.total);
            offenceOccurence+= time.total;
            placedataToInsert.push(dataToInsert);
          });
        placedataToInsert.push(["Total",offenceOccurence])
    });

    placedataToInsert= placedataToInsert.map(row => Object.keys(row).map(key => row[key]));
    for (let i = 0; i < placedataToInsert.length; i++) {
      let row = placedataToInsert[i];
      if (i % 25 === 0) {
        console.log(row);
      
          row.unshift({rowSpan: 25, content:this.provisionName[i], styles: {valign: 'middle', halign: 'left'}});
      }
    }
  //  firstPlacedataToInsert.push(["","Total",firstPlace.totalOffences])
    doc.autoTable({
        head: head,
        body: placedataToInsert,
        startY:55,
        theme: 'grid',
        headStyles: {
          fontSize: 9
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

    doc.save('Detailed report '+place.name+'.pdf');

}

}

import { FineService } from './../_services/fine.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TrafficPolicemenService } from '../_services/trafficPolicemen.service';
import * as jspdf from 'jspdf'; 
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  policeStationName=this.authService.decodedToken.policeStationName ;
  policeStationId=this.authService.decodedToken._id ;
  policeStation;

  
  public captureScreen()  
  {  
    var print = document.getElementById('contentToConvert');  
    html2canvas(print).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });  
  }  
  
  constructor(private authService:AuthService,private fineService:FineService) { }

  fine:any;
  fineId;
  ngOnInit() {
     this.authService.getPoliceStationDetails(this.policeStationId)
     .subscribe(
      (response)=>{
        this.policeStation=response;
        // console.log(response)
        // console.log(this.policeStationId);
      },
        
      (error)=>console.log(error)
    );
  }  

  searchFine(){
    console.log(this.fineId);
    this.fineService.getfine(this.fineId)
    .subscribe(response=>{
      this.fine=response;
      console.log(response);
      // this.dataSource = new PaidFinesTableDataSource(this.paginator, this.sort,this.data);
    },(error:Response)=>{
      console.log(error);
    })
  }
}

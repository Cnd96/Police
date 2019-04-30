import { FineService } from './../_services/fine.service';
import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf'; 
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'app-payUnpaidFine',
  templateUrl: './payUnpaidFine.component.html',
  styleUrls: ['./payUnpaidFine.component.css']
})
export class PayUnpaidFineComponent implements OnInit {

  unPaidFineId:any;
  fine:any;
  offences:any;
  constructor(private fineservice: FineService) { }

  ngOnInit() {
     this.unPaidFineId=this.fineservice.unpaidFineID;
    console.log(this.unPaidFineId);
   
    this.fine= this.fineservice.getfine(this.unPaidFineId)
    .subscribe(response=>{
      // console.log(response);
      this.fine=response[0];
      this.offences=response[0].offences;
      this.fine.additionalPay=500;
      this.fine.total=this.fine.additionalPay+this.fine.amount;
      console.log( this.fine.total);
    },(error:Response)=>{
    })
  }

  
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
}

import { FineService } from './../_services/fine.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '../_services/dialog.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  driver;
  unpaidFines=[];
  courtCases=[];
  paidFines=[];
  driverId:any;
  constructor(private fineService:FineService,private router:Router,private dialogService:DialogService) { }

  ngOnInit() {
    
  }

  getDriverDetails(){

    if(!(/^(B)(\d{7})$/.test(this.driverId))){
      this.dialogService.openMessageDialog('Enter valid license number.');
      return ;
    }

    this.paidFines=[];
    this.unpaidFines=[];
    this.fineService.getDriverFinesDetails(this.driverId)
    .subscribe(response=>{
      this.driver=response;
      this.getUnpaidFine(this.driver.fines);
      this.getPaidFine(this.driver.fines);
      this.courtCases=this.driver.courtCases;
      console.log(this.unpaidFines);
      console.log(this.paidFines);
    },(error:Response)=>{
      this.dialogService.openMessageDialog('Enter valid license number.');
      this.driver=null;
    })
  }

  getUnpaidFine(fines){
    fines.forEach((fine)=> {
      if(!fine.fineStatus){
        this.unpaidFines.push(fine);
      }
    });
  }
  getPaidFine(fines){
    fines.forEach((fine)=> {
      if(fine.fineStatus){
        this.paidFines.push(fine);
      }
    });
  }

  recordFine(){
    this.router.navigate(['/recordFine',this.driver._id]);
  }
  recordCourtCaseNoLicense(){
    this.router.navigate(['/recordCourtCase','No']);
  }
 

  recordCourtCase(){
    this.router.navigate(['/recordCourtCase',this.driver._id]);
  }


}

import { FineService } from './../_services/fine.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  driver;
  unpaidFines=[];
  paidFines=[];
  driverId:any;
  constructor(private fineService:FineService,private router:Router) { }

  ngOnInit() {
    
  }

  getDriverDetails(){
    this.paidFines=[];
    this.unpaidFines=[];
    this.fineService.getDriverFinesDetails(this.driverId)
    .subscribe(response=>{
      this.driver=response;
      this.getUnpaidFine(this.driver.fines);
      this.getPaidFine(this.driver.fines);
      console.log(this.unpaidFines);
      console.log(this.paidFines);
    },(error:Response)=>{
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



}

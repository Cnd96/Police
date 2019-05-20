import { FineService } from './../_services/fine.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TrafficPolicemenService } from '../_services/trafficPolicemen.service';
import { Router } from '@angular/router';
import { DialogService } from '../_services/dialog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  policeStationName=this.authService.decodedToken.policeStationName ;
  policeStationId=this.authService.decodedToken._id ;
  policeStation;

  constructor(private authService:AuthService,private fineService:FineService,private router:Router,private dialogService:DialogService) { }

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
    // console.log(this.fineId);
    this.fineService.getfine(this.fineId)
    .subscribe(response=>{
      this.fine=response[0];
      if(this.fine.fineStatus==true){
        this.dialogService.openMessageDialog('Enter unpaid fine');
      }
      else{
        this.fineService.unpaidFineID=this.fineId;
        this.router.navigate(['/payUnpaidFine']);
      }
     
      // console.log(this.fineId);
      // this.dataSource = new PaidFinesTableDataSource(this.paginator, this.sort,this.data);
    },(error:Response)=>{
      this.dialogService.openMessageDialog('Invalid Fine Id');
      console.log(error);
    })
  }

  clickReport(){
    this.router.navigate(['/testReport']);
  }
 
}

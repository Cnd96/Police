import { FineService } from './../_services/fine.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TrafficPolicemenService } from '../_services/trafficPolicemen.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  policeStationName=this.authService.decodedToken.policeStationName ;
  policeStationId=this.authService.decodedToken._id ;
  policeStation;

  constructor(private authService:AuthService,private fineService:FineService,private router:Router) { }

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
      this.fine=response;
      this.fineService.unpaidFineID=this.fineId;
      this.router.navigate(['/payUnpaidFine']);
      // console.log(this.fineId);
      // this.dataSource = new PaidFinesTableDataSource(this.paginator, this.sort,this.data);
    },(error:Response)=>{
      alert("Invalid fine Id");
      console.log(error);
    })
  }
}

import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  policeStationName=this.authService.decodedToken.policeStationName ;
  policeStationId=this.authService.decodedToken._id ;
  policeStation;
  
  
  constructor(private authService:AuthService) { }

  ngOnInit() {
     this.authService.getPoliceStationDetails(this.policeStationId)
     .subscribe(
      (response)=>{
        this.policeStation=response;
        console.log(response)},
      (error)=>console.log(error)
    );
  }

}

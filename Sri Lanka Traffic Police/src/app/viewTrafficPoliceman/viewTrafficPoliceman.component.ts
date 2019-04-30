import { Component, OnInit } from '@angular/core';
import { TrafficPolicemenService } from '../_services/trafficPolicemen.service';

@Component({
  selector: 'app-viewTrafficPoliceman',
  templateUrl: './viewTrafficPoliceman.component.html',
  styleUrls: ['./viewTrafficPoliceman.component.css']
})
export class ViewTrafficPolicemanComponent implements OnInit {

  policemanId:any;
  trafficPoliceman:any;

  constructor(private trafficPolicemenService:TrafficPolicemenService ) { }

  ngOnInit() {
    this.policemanId=this.trafficPolicemenService.policeManId;
    console.log(this.policemanId);
    this.trafficPoliceman= this.trafficPolicemenService.getTrafficPoliceman(this.policemanId)
    .subscribe(response=>{
     
      this.trafficPoliceman=response;
    },(error:Response)=>{
    })
  }

}

import { PoliceStationService } from './../_services/policeStation.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrafficPolicemanTableComponent } from '../traffic-policeman-table/traffic-policeman-table.component';

@Component({
  selector: 'app-viewPoliceStation',
  templateUrl: './viewPoliceStation.component.html',
  styleUrls: ['./viewPoliceStation.component.css']
})
export class ViewPoliceStationComponent implements OnInit {
  @ViewChild(TrafficPolicemanTableComponent ) ChildTrafficPolicemenTable: TrafficPolicemanTableComponent ; 
  policeStationId;
  policeStation;
  constructor( private route :ActivatedRoute,private policeStationService:PoliceStationService) { }


  ngOnInit() {
    this.route.paramMap
      .subscribe(params=>{
        this.policeStationId= params.get('policeStationId');
        this.getPoliceStation(this.policeStationId);
      })
  }

  getPoliceStation(policestationId){
    this.policeStationService.getPoliceStation(policestationId)
    .subscribe(response=>{
      console.log(response);
      this.policeStation=response;
      this.ChildTrafficPolicemenTable.displayTrafficPoliceMen(this.policeStation.policemen);
    },(error:Response)=>{
    })
  }
}

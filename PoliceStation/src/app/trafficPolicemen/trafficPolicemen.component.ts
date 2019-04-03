import { MatDialog, MatDialogConfig } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { CreatePolicemanComponent } from '../createPoliceman/createPoliceman.component';

@Component({
  selector: 'app-trafficPolicemen',
  templateUrl: './trafficPolicemen.component.html',
  styleUrls: ['./trafficPolicemen.component.css']
})
export class TrafficPolicemenComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit() {
  }
  createPoliceStation(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="80%";
    this.dialog.open(CreatePolicemanComponent, dialogConfig);
  }
}

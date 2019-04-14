import { CreatePoliceStationComponent } from './../createPoliceStation/createPoliceStation.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-policeStation',
  templateUrl: './policeStation.component.html',
  styleUrls: ['./policeStation.component.css']
})
export class PoliceStationComponent implements OnInit {

  constructor(private dialog : MatDialog) { }

  ngOnInit() {
  }
  createPoliceStation(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    // dialogConfig.width="60%";
    this.dialog.open(CreatePoliceStationComponent, dialogConfig);
  }
}

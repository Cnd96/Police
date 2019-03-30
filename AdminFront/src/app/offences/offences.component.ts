import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material';
import { OffenceComponent } from '../offence/offence.component';

@Component({
  selector: 'app-offences',
  templateUrl: './offences.component.html',
  styleUrls: ['./offences.component.css']
})
export class OffencesComponent implements OnInit {

  constructor(private dialog : MatDialog) { }

  ngOnInit() {
  }
  createOffence(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    this.dialog.open(OffenceComponent,dialogConfig);
  }
}

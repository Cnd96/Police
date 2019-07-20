import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-viewfine',
  templateUrl: './viewfine.component.html',
  styleUrls: ['./viewfine.component.css']
})
export class ViewfineComponent implements OnInit {
  static fine:any;
  offences:any;

  fineTodisplay:any;
  constructor(private dialogRef:MatDialogRef<ViewfineComponent>) { }

  ngOnInit() {
    this.fineTodisplay=ViewfineComponent.fine;
    this.offences=ViewfineComponent.fine.offences;
    console.log(this.fineTodisplay);
  }

  close(){
    this.dialogRef.close();
  }
}

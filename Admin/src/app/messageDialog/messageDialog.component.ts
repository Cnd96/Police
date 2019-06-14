import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA ,MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-messageDialog',
  templateUrl: './messageDialog.component.html',
  styleUrls: ['./messageDialog.component.css']
})
export class MessageDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<MessageDialogComponent>) { }

  ngOnInit() {
  }
  close(){
    this.dialogRef.close();
  }
}

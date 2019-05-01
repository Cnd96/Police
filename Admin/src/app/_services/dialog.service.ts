import { ConfirmDialogComponent } from './../confirmDialog/confirmDialog.component';
import { MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

constructor(private dialog:MatDialog) { }

openConfirmDialog(){
  this.dialog.open(ConfirmDialogComponent,{
    width:'390px',
    disableClose:true
  });
}
}

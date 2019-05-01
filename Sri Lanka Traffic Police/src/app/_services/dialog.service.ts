import { ConfirmDialogComponent } from './../confirmDialog/confirmDialog.component';
import { MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';
import { MessageDialogComponent } from '../messageDialog/messageDialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

constructor(private dialog:MatDialog) { }

openConfirmDialog(message){
  return  this.dialog.open(ConfirmDialogComponent,{
    width:'390px',
    disableClose:true,
    data:{
      message:message
    }
  });
}

openMessageDialog(message){
  return  this.dialog.open(MessageDialogComponent,{
    width:'390px',
    disableClose:true,
    data:{
      message:message
    }
  });
}
}

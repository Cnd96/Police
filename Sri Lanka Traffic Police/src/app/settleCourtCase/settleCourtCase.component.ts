import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DialogService } from '../_services/dialog.service';
import { CourtCaseService } from '../_services/courtCase.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settleCourtCase',
  templateUrl: './settleCourtCase.component.html',
  styleUrls: ['./settleCourtCase.component.css']
})
export class SettleCourtCaseComponent implements OnInit {

  
  constructor(private router : Router,private dialogRef:MatDialogRef<SettleCourtCaseComponent>,private authService:AuthService,
    private dialogService:DialogService,private courtCaseService:CourtCaseService) { }

  recordedBy=this.authService.decodedToken.loggedPoliceman;
  static courtCase;
  courtForm=new FormGroup(
    { courtId: new FormControl('', Validators.required),
      nic: new FormControl('', Validators.required),
      address:new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      courtPaidRecordedBy:new FormControl(''),
      paidDate:new FormControl('')
    }
  );
  ngOnInit() {
    this.populateForm(SettleCourtCaseComponent.courtCase)
  }
  submit(){
    this.dialogService.openConfirmDialog('Confirm Settling Court Case?')
        .afterClosed().subscribe(res =>{
          console.log(res);
          if(res){
            this.courtCaseService.settleCourtCase( Object.assign({}, this.courtForm.value)).subscribe(next=>{
              this.close();
              this.dialogService.openMessageDialog('Succesfully settled court date');
              this.router.navigate(['/home']);
              console.log(next);
            },(error:Response)=>{
              
              if(error.status===400){
                alert('Error.')
                
                console.log(error);
              }
              else alert('Unexpected error found');
            })
       
          }
    });
  }

  close(){
    this.dialogRef.close();
  }

  populateForm(courtCase) {
    // console.log(offence._id);
   // console.log(this.newOffence);
   this.courtForm.setValue({
     courtId:courtCase._id,
     nic:courtCase.nic,
     address:courtCase.driverAddress,
     amount:'',
     courtPaidRecordedBy:this.recordedBy,
     paidDate:new Date()
   })
 }

}

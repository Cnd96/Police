import { CourtCaseService } from './../_services/courtCase.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, createPlatformFactory } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { DialogService } from '../_services/dialog.service';
import { fineFormValidators } from '../RecordFine/fineFormValidators';

@Component({
  selector: 'app-updateToCourtCase',
  templateUrl: './updateToCourtCase.component.html',
  styleUrls: ['./updateToCourtCase.component.css']
})
export class UpdateToCourtCaseComponent implements OnInit {
  courtForm: FormGroup;
  recordedBy=this.authService.decodedToken.loggedPoliceman;
  static fineDetails:any;
  courtCase:any;

  constructor(private fb: FormBuilder,private dialogRef:MatDialogRef<UpdateToCourtCaseComponent>,private authService: AuthService,
    private dialogService:DialogService,private courtCaseService:CourtCaseService) { }
 
  
  
  // (
  //   { courtId: new FormControl('', Validators.required),
  //     nic: new FormControl('', Validators.required,fineFormValidators.nicValidator),
  //     address:new FormControl('', Validators.required),
  //     courtHearingDate: new FormControl('', Validators.required),
  //     courtHearingTime: new FormControl('', Validators.required),
  //     amount: new FormControl(''),
  //     status: new FormControl(''),
  //     paidDate: new FormControl(''),
  //     courtRecordedBy:new FormControl(''),
  //     courtPaidRecordedBy:new FormControl(''),
  //   }
  // );
  ngOnInit() {
    this.courtCase=UpdateToCourtCaseComponent.fineDetails;
    this.createForm();
  }

  createForm(){
    this.courtForm = this.fb.group({
      courtId: ['',Validators.required ],
      nic:['',fineFormValidators.nicValidator],
      address: ['',Validators.required ],
      courtHearingDate:['',Validators.required],
      courtHearingTime:['',Validators.required],
      amount:[''],
      status:[''],
      paidDate:[''],
      courtRecordedBy:[''],
      courtPaidRecordedBy:[''],
    });
  }
  submit(){
    this.courtCase.courtId=this.courtForm.value.courtId;
    this.courtCase.nic=this.courtForm.value.nic;
    this.courtCase.address=this.courtForm.value.address;
    this.courtCase.courtHearingDate=this.courtForm.value.courtHearingDate;
    this.courtCase.courtHearingTime=this.courtForm.value.courtHearingTime;
    this.courtCase.amount=0;
    this.courtCase.status=false;
    this.courtCase.paidDate=new Date();
    this.courtCase.courtRecordedBy=this.recordedBy;
    this.courtCase.courtPaidRecordedBy='No';

    console.log(this.courtCase);
    this.dialogService.openConfirmDialog('Confirm Update Fine To Court Case?')
    .afterClosed().subscribe(res =>{
      console.log(res);
      if(res){
        this.courtCaseService.updateFineToCourtCase(this.courtCase).subscribe(next=>{
          this.dialogService.openMessageDialog('Succesfully recorded the court case');
          // this.router.navigate(['/home']);
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
}

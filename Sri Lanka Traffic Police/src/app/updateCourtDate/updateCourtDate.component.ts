import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DialogService } from '../_services/dialog.service';
import { CourtCaseService } from '../_services/courtCase.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-updateCourtDate',
  templateUrl: './updateCourtDate.component.html',
  styleUrls: ['./updateCourtDate.component.css']
})
export class UpdateCourtDateComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<UpdateCourtDateComponent>,
    private dialogService:DialogService,private courtCaseService:CourtCaseService) { }

  static courtCase;
  courtForm=new FormGroup(
    { courtId: new FormControl('', Validators.required),
      nic: new FormControl('', Validators.required),
      address:new FormControl('', Validators.required),
      courtHearingDate: new FormControl('', Validators.required),
      courtHearingTime: new FormControl('', Validators.required),
    }
  );
  ngOnInit() {
    this.populateForm(UpdateCourtDateComponent.courtCase)
  }
  submit(){
    
    this.dialogService.openConfirmDialog('Confirm Update Court Date?')
        .afterClosed().subscribe(res =>{
          console.log(res);
          if(res){
            this.courtCaseService.updateCourtDate( Object.assign({}, this.courtForm.value)).subscribe(next=>{
              this.dialogService.openMessageDialog('Succesfully updated court date');
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

  populateForm(courtCase) {
    // console.log(offence._id);
   // console.log(this.newOffence);
   this.courtForm.setValue({
     courtId:courtCase._id,
     nic:courtCase.nic,
     address:courtCase.driverAddress,
     courtHearingDate:courtCase.courtHearingDate,
     courtHearingTime:'',
   })
 }
}

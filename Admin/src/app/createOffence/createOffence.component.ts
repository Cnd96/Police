import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { OffenceService } from '../_services/offence.service';
import { Router } from '@angular/router';
import {MatDialogRef} from '@angular/material';
import { DialogService } from '../_services/dialog.service';

@Component({
  selector: 'app-createOffence',
  templateUrl: './createOffence.component.html',
  styleUrls: ['./createOffence.component.css']
})
export class CreateOffenceComponent implements OnInit {
  offence:any;
  newOffence:boolean;
  offenceTypes=[{
      name:"Court Case",
      id:true
  },{
    name:"Fine",
    id:false
  },]
  offenceForm=new FormGroup(
    { sectionOfAct: new FormControl('Section', Validators.required),
      provision: new FormControl('', Validators.required),
      type:new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      daysAllowed: new FormControl('', Validators.required),
    }
  );
  constructor(private dialogRef:MatDialogRef<CreateOffenceComponent>, 
    private dialogService:DialogService,private offenceService: OffenceService ,private router: Router) { }

  ngOnInit() {
    this.offenceService.getOffence().subscribe(response=>{
      // console.log(response)
     this.populateForm(response);
     this.newOffence=false;
    //  console.log(this.newOffence);
    this.showDaysAllowed=true; 
    },(error:Response)=>{
      this.newOffence=true;
      // console.log(this.newOffence);
    })
    this.offenceService.offenceId='noid';    
  }

  showDaysAllowed:any;

  typeChange(data){
    console.log(data.value);
    if(data.value){
      this.offenceForm.patchValue({daysAllowed:0});
      this.showDaysAllowed=false;
    }
    else{
      this.showDaysAllowed=true;
    }
    console.log(this.offenceForm.value);
  }
  submit(){

    // console.log(this.newOffence);
    this.offence = Object.assign({}, this.offenceForm.value);
    // console.log(this.offence.sectionOfAct);

    if(this.newOffence==true){
      this.offenceService.createOffence(this.offence).subscribe(next=>{
     
        this.dialogService.openMessageDialog('Succesfully created new offence');
        // this.router.navigate(['/home']);
        this.close();
      },(error:Response)=>{
        
        if(error.status===400){
          alert('Offence already exist.')
          console.log(error);
        }
        else alert('Unexpected error found');
      })
      console.log(this.offence);
    }
    else{
      this.offenceService.updateOffence(this.offence).subscribe(next=>{
        this.dialogService.openMessageDialog('Succesfully updated offence');
        // this.router.navigate(['/home/offences']);
        this.close();
      },(error:Response)=>{
        
        if(error.status===400){
          alert('Offence not exist.')
          console.log(error);
        }
        else alert('Unexpected error found');
      })
    }
  }

  clear(){
    this.dialogRef.close();
  //   this.offenceForm.reset();
  //   this.initializeForm();
   
  // }
  // initializeForm(){
  //   this.offenceForm.setValue({
  //     sectionOfAct:'Section',
  //     provision:'',
  //     amount:''
  //   })
  }
  close(){
    this.dialogRef.close();
  }

  populateForm(offence) {
     // console.log(offence._id);
    // console.log(this.newOffence);
    this.offenceForm.setValue({
      sectionOfAct:offence._id,
      provision:offence.provision,
      amount:offence.amount,
      type:offence.type,
      daysAllowed:offence.daysAllowed,
    })
  }
}

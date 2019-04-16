import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { OffenceService } from '../_services/offence.service';
import { Router } from '@angular/router';
import {MatDialogRef} from '@angular/material';
import { networkInterfaces } from 'os';
@Component({
  selector: 'app-offence',
  templateUrl: './offence.component.html',
  styleUrls: ['./offence.component.css']
})
export class OffenceComponent implements OnInit {
  offence:any;
  newOffence:boolean;
  offenceForm=new FormGroup(
    { sectionOfAct: new FormControl('Section', Validators.required),
      provision: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required)}
  );
  constructor(private dialogRef:MatDialogRef<OffenceComponent>, private offenceService: OffenceService ,private router: Router) { }

  ngOnInit() {
    this.offenceService.getOffence().subscribe(response=>{
      // console.log(response)
     this.populateForm(response);
     this.newOffence=false;
    //  console.log(this.newOffence);
    },(error:Response)=>{
      this.newOffence=true;
      // console.log(this.newOffence);
    })
    this.offenceService.offenceId='noid';    
  }
  get sectionOfAct() {
    return this.offenceForm.get('sectionOfAct');
  }

  get provision() {
    return this.offenceForm.get('provision');
  }
  get amount() {
    return this.offenceForm.get('amount');
  }

  submit(){

    // console.log(this.newOffence);
    this.offence = Object.assign({}, this.offenceForm.value);
    // console.log(this.offence.sectionOfAct);

    if(this.newOffence==true){
      this.offenceService.createOffence(this.offence).subscribe(next=>{
        alert("Succesfully created new offence");
        this.router.navigate(['/home/offences']);
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
        alert("Succesfully updated offence");
        this.router.navigate(['/home/offences']);
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
      amount:offence.amount
    })
  }
}

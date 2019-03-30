import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { OffenceService } from '../_services/offence.service';
import { Router } from '@angular/router';
import {MatDialogRef} from '@angular/material';
@Component({
  selector: 'app-offence',
  templateUrl: './offence.component.html',
  styleUrls: ['./offence.component.css']
})
export class OffenceComponent implements OnInit {
  offence: any;
  offenceForm=new FormGroup(
    { sectionOfAct: new FormControl('Section', Validators.required),
      provision: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required)}
  );
  constructor(private dialogRef:MatDialogRef<OffenceComponent>, private offenceService: OffenceService ,private router: Router) { }

  ngOnInit() {
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
    this.offence = Object.assign({}, this.offenceForm.value);
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

  clear(){
    this.offenceForm.reset();
    this.initializeForm();
   
  }
  initializeForm(){
    this.offenceForm.setValue({
      sectionOfAct:'Section',
      provision:'',
      amount:''
    })
  }
  close(){
    this.dialogRef.close();
  }
}

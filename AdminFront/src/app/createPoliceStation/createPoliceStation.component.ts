import { PoliceStationService } from './../_services/policeStation.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-createPoliceStation',
  templateUrl: './createPoliceStation.component.html',
  styleUrls: ['./createPoliceStation.component.css']
})
export class CreatePoliceStationComponent implements OnInit {
  policeStation: any;
  policeStationForm: FormGroup;
  constructor( private fb: FormBuilder,private dialogRef:MatDialogRef<CreatePoliceStationComponent>,private policeStationService :PoliceStationService) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.policeStationForm = this.fb.group({
      policeStationName: ['',Validators.required],
      phoneNo: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  
  close(){
    this.dialogRef.close();
  }

  
  submit(){
    this.policeStation = Object.assign({}, this.policeStationForm.value);
    this.policeStationService.createPoliceStation(this.policeStation).subscribe(next=>{
      alert("Succesfully created new police station");
      // this.router.navigate(['/home/offences']);
      this.close();
    },(error:Response)=>{
      
      if(error.status===400){
        alert('Police station already exist.')
        console.log(error);
      }
      else alert('Unexpected error found');
    })
    console.log(this.policeStation);
  }

  get policeStationName() {
    return this.policeStationForm.get('policeStationName');
  }

  get phoneNo() {
    return this.policeStationForm.get('phoneNo');
  }
  get address() {
    return this.policeStationForm.get('address');
  }
  get password() {
    return this.policeStationForm.get('password');
  }
  get confirmPassword() {
    return this.policeStationForm.get('confirmPassword');
  }
}

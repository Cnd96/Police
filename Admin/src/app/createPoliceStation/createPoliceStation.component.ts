import { PoliceStationService } from './../_services/policeStation.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { OicDivisionService } from '../_services/oicDivision.service';

@Component({
  selector: 'app-createPoliceStation',
  templateUrl: './createPoliceStation.component.html',
  styleUrls: ['./createPoliceStation.component.css']
})
export class CreatePoliceStationComponent implements OnInit {
  policeStation: any;
  policeStationForm: FormGroup;
  oicDivisions:any;
  constructor( private fb: FormBuilder,private dialogRef:MatDialogRef<CreatePoliceStationComponent>,
    private policeStationService :PoliceStationService,private oicDivisionService:OicDivisionService ) { }

  ngOnInit() {
    this.createRegisterForm();
    this.loadOicDivisions();
  }

  loadOicDivisions(){
    this.oicDivisionService.getOicDivisions()
        .subscribe(
          (response)=>{
            this.oicDivisions=response;
            console.log(response[0]._id);
          },
          (error)=>console.log(error)
        );
  }
  createRegisterForm() {
    this.policeStationForm = this.fb.group({
      policeStationName: ['',Validators.required],
      oicDivisionName:[''],
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
    console.log(this.policeStation);
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
// 1324453425
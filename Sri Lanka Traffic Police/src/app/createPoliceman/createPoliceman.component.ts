import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { TrafficPolicemenService } from '../_services/trafficPolicemen.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-createPoliceman',
  templateUrl: './createPoliceman.component.html',
  styleUrls: ['./createPoliceman.component.css']
})
export class CreatePolicemanComponent implements OnInit {
  startDate = new Date(1990, 0, 1);
  policeStationID=this.authService.decodedToken._id ;
  Role='TrafficPoliceman';
  policeman: any;
  policemanForm: FormGroup;
  ranks;

  constructor( private fb: FormBuilder,private trafficPolicemenService :TrafficPolicemenService,private authService:AuthService,private dialogRef:MatDialogRef<CreatePolicemanComponent>) { }

  ngOnInit() {
    this.createRegisterForm();
    this.loadRanks();
  }

  loadRanks(){
    this.trafficPolicemenService.getRanks()
        .subscribe(
          (response)=>{
            this.ranks=response;
          },
          (error)=>console.log(error)
        );
  }
  //  Validators.maxLength(10)
 
  createRegisterForm() {
    this.policemanForm = this.fb.group({
      _id:['',Validators.required],
      name: ['',Validators.required],
      rankId:[''],
      phoneNo: ['',Validators.required ],
      address: ['', Validators.required],
      nationalId:['',Validators.required],
      dateOfBirth:['',Validators.required],
      policeStationId:[''],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  
  submit(){
    this.policemanForm.patchValue({policeStationId:this.policeStationID});
    this.policeman = Object.assign({}, this.policemanForm.value);
    this.trafficPolicemenService.createTrafficPoliceman(this.policeman).subscribe(next=>{
      alert("Succesfully created new traffic policeman");
      // this.router.navigate(['/home/offences']);
  
    },(error:Response)=>{
      
      if(error.status===400){
        alert('Policeman already exist.')
        // console.log(this.policeman);
        console.log(error);
      }
      else alert('Unexpected error found');
    })
    console.log(this.policeman);
  }

  get _id() {
    return this.policemanForm.get('_id');
  }
  get name() {
    return this.policemanForm.get('name');
  }
  get role() {
    return this.policemanForm.get('role');
  }
  get nationalId() {
    return this.policemanForm.get('nationalId');
  }
  get dateOfBirth() {
    return this.policemanForm.get('dateOfBirth');
  }
  get policeStation() {
    return this.policemanForm.get('policeStation');
  }
  get phoneNo() {
    return this.policemanForm.get('phoneNo');
  }
  get address() {
    return this.policemanForm.get('address');
  }
  get password() {
    return this.policemanForm.get('password');
  }
  get confirmPassword() {
    return this.policemanForm.get('confirmPassword');
  }

  
  close(){
    this.dialogRef.close();
  }

  
}

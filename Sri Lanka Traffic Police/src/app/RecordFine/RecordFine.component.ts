import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { TrafficPolicemenService } from '../_services/trafficPolicemen.service';
import { AuthService } from '../_services/auth.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { OffenceService } from '../_services/offence.service';
import { fineFormValidators } from './fineFormValidators';
import { FineService } from '../_services/fine.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from '../_services/dialog.service';

export interface TrafficPoliceman {
  _id: string;
  name: string;
}


@Component({
  selector: 'app-RecordFine',
  templateUrl: './RecordFine.component.html',
  styleUrls: ['./RecordFine.component.css']
})
export class RecordFineComponent implements OnInit {
  fineForm: FormGroup;
  fine:any;
  policeStationId=this.authService.decodedToken._id ;
  trafficPolicemen:any;
  trafficPolicemenList:Observable <TrafficPoliceman[]>;
  trafficPolicemenCtrl = new FormControl('',Validators.required);
  startDate = new Date();
  offencesList:any;
  fineOffences:any;
  totalAmount=0;
  sectionOfAct=[];
  driverLicenseNo;


  fineStatusSelected:any;
  fineStatuses=[{name:"Unpaid ",status:false},{name:"Paid ",status:true}];

  constructor(private fb: FormBuilder,private trafficPolicemenService:TrafficPolicemenService,private router:Router,
    private offenceService:OffenceService,private authService:AuthService,private fineService:FineService
    ,private dialogService:DialogService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.fineOffences=[];
  
    this.loadPolicemen();
    this.loadOffences();

    this.route.paramMap
    .subscribe(params=>{
      this.driverLicenseNo= params.get('licenseNo');
    })
    this.createFineForm();

  }

  loadOffences(){
    this.offenceService.getOffences()
    .subscribe(response=>{
      this.offencesList=response;
      // console.log(this.offencesList);
    },(error:Response)=>{
    })

  }

  searchPoliceman(event){
    // console.log(event.keyCode);
    
    // console.log(this.fineForm.get('policemanId').value);
    
    if((event.keyCode==40)||(event.keyCode==38)){
      return 
    }
    this.trafficPolicemenService.searchTrafficPolicemen(this.policeStationId,this.fineForm.get('policemanId').value)
    .subscribe(response=>{
      this.trafficPolicemen=response;
    },(error:Response)=>{
    })
  }

  loadPolicemen(){
    this.trafficPolicemenService.getTrafficPolicemen(this.policeStationId)
    .subscribe(response=>{
      this.trafficPolicemen=response;
      // this.trafficPolicemenList=this.trafficPolicemen;
      // this.trafficPolicemenList = this.trafficPolicemenCtrl.valueChanges
      // .pipe(
      //   startWith(''),
      //   map(trafficPoliceman => trafficPoliceman ? this._filterTrafficPoliceman(trafficPoliceman) : this.trafficPolicemen.slice())
      // );
    },(error:Response)=>{
    })
  }

  // private _filterTrafficPoliceman(value: string): TrafficPoliceman[] {
  //   const filterValue = value.toLowerCase();
  //   return this.trafficPolicemen.filter(trafficPoliceman => trafficPoliceman.name.toLowerCase().indexOf(filterValue) === 0);
  // }

  createFineForm() {
    this.fineForm = this.fb.group({
      fineId:['',Validators.required],
      licenseNo:[this.driverLicenseNo,fineFormValidators.licenseNoValidator],
      vehicleNo: ['',fineFormValidators.vehicleNoValidator],
      offences:[''],
      fineStatus: ['',Validators.required ],
      policemanId: ['', fineFormValidators.policemanIdValidator],
      totalAmountPaid:[''],
      place:['',Validators.required],
      date:['',Validators.required],
      time:['',Validators.required],
      validUntil:['']
    });
  }

  get licenseNo() {
    return this.fineForm.get('licenseNo');
  }
  get vehicleNo() {
    return this.fineForm.get('vehicleNo');
  }
  get offences() {
    return this.fineForm.get('offences');
  }
  get fineStatus() {
    return this.fineForm.get('fineStatus');
  }
  get policemanId() {
    return this.fineForm.get('policemanId');
  }
  get totalAmountPaid() {
    return this.fineForm.get('totalAmountPaid');
  }
  get place() {
    return this.fineForm.get('place');
  }
  get date() {
    return this.fineForm.get('date');
  }
  get time() {
    return this.fineForm.get('time');
  }

  offenceSelect(e,offence){
    // console.log(e.checked);
    if(e.checked){   
      this.fineOffences.push(offence);
      this.totalAmount+=offence.amount;
      this.sectionOfAct.push(offence._id);
    }
    else if(!e.checked){
      let index = this.fineOffences.indexOf(offence);
      if (index > -1) {
        this.fineOffences.splice(index, 1);
      }
      let indexSectionofAct = this.sectionOfAct.indexOf(offence._id);
      if (indexSectionofAct > -1) {
        this.sectionOfAct.splice(indexSectionofAct, 1);
      }
      this.totalAmount-=offence.amount;
    }
    console.log(this.sectionOfAct.length);
  }

  submit(){
    if(this.fineForm.get('fineStatus').value){
      this.fineForm.patchValue({totalAmountPaid:this.totalAmount})
      this.fineForm.get('totalAmountPaid').updateValueAndValidity();
    }
    else{
      this.fineForm.patchValue({totalAmountPaid:0})
      this.fineForm.get('totalAmountPaid').updateValueAndValidity();
    }

    
    this.fineForm.patchValue({offences:this.sectionOfAct});
    this.fineForm.get('offences').updateValueAndValidity();

    // const date=this.fineForm.value.date;

    let validuntilDate = new Date(this.fineForm.value.date);
    // let dt = this.fineForm.value.date;
    validuntilDate.setDate( validuntilDate.getDate() +28 );
    this.fineForm.patchValue({validUntil :validuntilDate});
    this.fineForm.get('validUntil').updateValueAndValidity();
    // if(this.fineForm.invalid){
    //   console.log("invalid");
    //   return;
    // }
    this.fine = Object.assign({}, this.fineForm.value);
    this.dialogService.openConfirmDialog('Confirm Record Fine?')
        .afterClosed().subscribe(res =>{
          console.log(res);
          if(res){
            this.fineService.recordFineDetails(this.fine).subscribe(next=>{
              this.dialogService.openMessageDialog('Succesfully recorded the fine');
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
}

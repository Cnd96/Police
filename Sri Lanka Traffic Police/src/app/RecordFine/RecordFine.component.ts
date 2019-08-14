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
  recordedBy=this.authService.decodedToken.loggedPoliceman;
  trafficPolicemen:any;
  // trafficPolicemenList:Observable <TrafficPoliceman[]>;
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
    console.log(new Date());
    this.fineOffences=[];
    this.offencesList=[];
    this.route.paramMap
    .subscribe(params=>{
      this.driverLicenseNo= params.get('licenseNo');
    })
    this.createFineForm();
    this.loadPolicemen();
    this.loadOffences();

   

  }

  loadOffences(){
    this.offenceService.getOffences()
    .subscribe(response=>{
      this.offencesList=response;

      this.offencesList.forEach(offence => {
        offence.selected=false;
      });

      if(this.driverLicenseNo=='No'){
        console.log(this.offencesList);
        this.offencesList.forEach(offence => {
          if(offence._id=='Section135'){
            offence.selected=true;
            offence.isBlocked=true;
            this.fineOffences.push(offence);
            this.totalAmount+=offence.amount;
            this.sectionOfAct.push(offence._id);
          }
        });
      }
      else{
        this.offencesList.forEach(offence => {
          if(offence._id=='Section135'){
            offence.isBlocked=true;
          }
        });
      }
      // console.log(this.offencesList);
    },(error:Response)=>{
    })
  }

  searchPoliceman(event){
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

    },(error:Response)=>{
    })
  }


  createFineForm() {
    this.fineForm = this.fb.group({
      policemanId: ['', fineFormValidators.policemanIdValidator],
      fineId:['',Validators.required],
      licenseNo:[this.driverLicenseNo,fineFormValidators.licenseNoValidator],
      vehicleNo: ['',fineFormValidators.vehicleNoValidator],
      offences:[''],
      fineStatus: ['',Validators.required ],
      totalAmountPaid:[''],
      place:['',Validators.required],
      date:['',Validators.required],
      time:['',Validators.required],
      validUntil:[''],
      unpaidRecordedBy:[''],
      paidRecordedBy:[''],
      paidDate:[''],
    });
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
    // console.log(this.sectionOfAct.length);
    // if(this.fineForm.invalid){
      console.log(this.fineForm.value.policemanId);
      console.log(this.fineForm.value.fineStatus);
      
    // }
  }

  submit(){
    this.fineForm.patchValue({unpaidRecordedBy:this.recordedBy});
    if(this.fineForm.get('fineStatus').value){
      this.fineForm.patchValue({totalAmountPaid:this.totalAmount})
      this.fineForm.get('totalAmountPaid').updateValueAndValidity();
      this.fineForm.patchValue({paidRecordedBy:this.recordedBy});
      
    }
    else{
      this.fineForm.patchValue({totalAmountPaid:0})
      this.fineForm.get('totalAmountPaid').updateValueAndValidity();
      this.fineForm.patchValue({paidRecordedBy:'no'});
    }

    this.fineForm.patchValue({paidDate:new Date()});
    this.fineForm.patchValue({offences:this.sectionOfAct});
    this.fineForm.get('offences').updateValueAndValidity();

   
    let date=new Date(this.fineForm.value.date);
    this.fineForm.patchValue({date:date.toDateString()});

    // const date=this.fineForm.value.date;

    let validuntilDate = new Date(this.fineForm.value.date);
    // let dt = this.fineForm.value.date;
    validuntilDate.setDate( validuntilDate.getDate() +28 );
    this.fineForm.patchValue({validUntil :validuntilDate.toDateString()});
    this.fineForm.get('validUntil').updateValueAndValidity();
    
   
    // if(this.fineForm.invalid){
    //   console.log("invalid");
    //   return;
    // }
    this.fine = Object.assign({}, this.fineForm.value);
    console.log(this.fine);
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


import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TrafficPolicemenService } from '../_services/trafficPolicemen.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OffenceService } from '../_services/offence.service';
import { AuthService } from '../_services/auth.service';
import { CourtCaseService } from '../_services/courtCase.service';
import { fineFormValidators } from '../RecordFine/fineFormValidators';
import { DialogService } from '../_services/dialog.service';

@Component({
  selector: 'app-recordCourtCase',
  templateUrl: './recordCourtCase.component.html',
  styleUrls: ['./recordCourtCase.component.css']
})
export class RecordCourtCaseComponent implements OnInit {
  driverLicenseNo:any;
  courtCaseForm: FormGroup;
  offencesList:any;
  courtOffences=[];
  fineOffences=[];
  sectionOfAct=[];
  driverOffences=[];
  trafficPolicemen:any;
  policeStationId=this.authService.decodedToken._id ;
  recordedBy=this.authService.decodedToken.loggedPoliceman;

  constructor(private fb: FormBuilder,private trafficPolicemenService:TrafficPolicemenService,private router:Router,
    private offenceService:OffenceService,private authService:AuthService,private courtCaseService:CourtCaseService
    ,private dialogService:DialogService,private route:ActivatedRoute) { }

  ngOnInit() {
    
    this.route.paramMap
    .subscribe(params=>{
      this.driverLicenseNo= params.get('licenseNo');
    })
    this.createCourtForm();
    this.loadPolicemen();
    this.loadOffences();
    
  }

  
  createCourtForm() {
    this.courtCaseForm = this.fb.group({
      policemanId: ['', fineFormValidators.policemanIdValidator],
      courtId:['',Validators.required],
      nic: ['',Validators.required ],
      driverName: ['',Validators.required ],
      address: ['',Validators.required ],
      licenseNo:[this.driverLicenseNo,fineFormValidators.licenseNoValidator],
      vehicleNo: ['',fineFormValidators.vehicleNoValidator],
      offences:[''],
      status: ['' ],
      place:['',Validators.required],
      date:['',Validators.required],
      time:['',Validators.required],
      amount:[''],
      courtHearingDate:['',Validators.required],
      courtHearingTime:['',Validators.required],
      unpaidRecordedBy:[''],
      courtPaidRecordedBy:[''],
      courtRecordedBy:[''],
      paidDate:[''],
    });
  }
  
  loadPolicemen(){
    this.trafficPolicemenService.getTrafficPolicemen(this.policeStationId)
    .subscribe(response=>{
      this.trafficPolicemen=response;

    },(error:Response)=>{
    })
  }

  loadOffences(){
    this.offenceService.getOffences()
    .subscribe(response=>{
      this.offencesList=response;

      this.offencesList.forEach(offence => {
        offence.selected=false;
        if(offence.type){
          this.courtOffences.push(offence);
         
        }
        else{
          this.fineOffences.push(offence);
        }
      });

      if(this.driverLicenseNo=='No'){
        this.offencesList.forEach(offence => {
          if(offence._id=='Section187'){
            offence.selected=true;
            offence.isBlocked=true;
            this.driverOffences.push(offence);
            this.sectionOfAct.push(offence._id);
          }
          if(offence._id=='Section130'){
            offence.isBlocked=true;
          }
        });
      }
      else{
        
      
      }
      
    },(error:Response)=>{
    })
  }

  
  offenceSelect(e,offence){
   
    if(e.checked){   
      this.driverOffences.push(offence);
      this.sectionOfAct.push(offence._id);
      this.blockOffencePairs(offence._id);
    }
    else if(!e.checked){
      let index = this.driverOffences.indexOf(offence);
      if (index > -1) {
        this.driverOffences.splice(index, 1);
      }
      let indexSectionofAct = this.sectionOfAct.indexOf(offence._id);
      if (indexSectionofAct > -1) {
        this.sectionOfAct.splice(indexSectionofAct, 1);
      }
      this.unBlockOffencePairs(offence._id);
    }
    // console.log(this.sectionOfAct.length);
    // if(this.fineForm.invalid){
  }

  blockOffencePairs(offenceId){
    if(offenceId=='Section163'){
      this.offencesList.forEach(offence => {
        if(offence._id=='Section38'){
          console.log(offence._id);
          offence.isBlocked=true;
        }
      });
    }
  }
  unBlockOffencePairs(offenceId){
    if(offenceId=='Section163'){
      this.offencesList.forEach(offence => {
        if(offence._id=='Section38'){
          console.log(offence._id);
          offence.isBlocked=false;
        }
      });
    }
  }
  submit(){
    this.courtCaseForm.patchValue({offences:this.sectionOfAct});
    this.courtCaseForm.patchValue({status:false});
    this.courtCaseForm.patchValue({amount:0});
    this.courtCaseForm.patchValue({unpaidRecordedBy:this.recordedBy});
    this.courtCaseForm.patchValue({courtRecordedBy:this.recordedBy});
    this.courtCaseForm.patchValue({courtPaidRecordedBy:this.recordedBy});
    this.courtCaseForm.patchValue({paidDate:new Date()});

    console.log( Object.assign({}, this.courtCaseForm.value))
    // this.dialogService.openConfirmDialog('Confirm Update Fine To Court Case?')
    // .afterClosed().subscribe(res =>{
    //   console.log(res);
    //   if(res){
    //     this.courtCaseService.createCourtCase(Object.assign({}, this.courtCaseForm.value)).subscribe(next=>{
    //       this.dialogService.openMessageDialog('Succesfully recorded the court case');
    //       // this.router.navigate(['/home']);
    //       console.log(next);
    //     },(error:Response)=>{
          
    //       if(error.status===400){
    //         alert('Error.')
            
    //         console.log(error);
    //       }
    //       else alert('Unexpected error found');
    //     })
   
    //   }
    // });
  }

}

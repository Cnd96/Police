import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-addDegrees',
  templateUrl: './addDegrees.component.html',
  styleUrls: ['./addDegrees.component.css']
})
export class AddDegreesComponent implements OnInit {

  minimumRequirements=[{name:"S",grade:"4"},
  {name:"C",grade:"3"},
  {name:"B",grade:"2"},
  {name:"A",grade:"1"}]
  
  Interests=[];

  interestsList=[];
  jobOpportunitiesList=[];

  BioScience:any;
  bioScienceApplicability=false;
  bioStreamBioSelectedGrade="4";
  bioStreamChemSelectedGrade="4";
  bioStreamPhySelectedGrade="4";




  addDegreesForm: FormGroup = new FormGroup({
  _id: new FormControl('', []),
  degreeName: new FormControl('', []),
  description: new FormControl('', []),
  aptitudeTestAvailability: new FormControl('', []),
  interests: new FormControl('', []),
  jobOpportunities: new FormControl('', []),
  physicalScience:new FormControl('', []),
  physicalScience_ICT: new FormControl('', []),
  bioScience: new FormControl('', []),
  bioScience_Agri: new FormControl('', [])

  });

  constructor() { }

  ngOnInit() {
    this.populateInterests();
    this.populateBioScience();
    console.log(this.BioScience);
    
  }

  populateInterests(){
    this.Interests=  [{id:"Science",name:"Science"},
    {id:"Agricluture Science",name:"Agricluture Science"},    
    {id:"IT",name:"IT"},]
  }

  populateBioScience(){
    this.BioScience={
      applicability:this.bioScienceApplicability,
      minimumReq:[
        {name:"Bio",grade:this.bioStreamBioSelectedGrade},
        {name:"Chem",grade:this.bioStreamChemSelectedGrade},
        {name:"Phy",grade:this.bioStreamPhySelectedGrade},
      ]
    }
  }
  bioScienceApplicabilityChange(){
    console.log(this.bioScienceApplicability);
    this.populateBioScience();
    console.log(this.BioScience);
  }
  bioScienceStreamBioSelected(){
    this.populateBioScience();
    console.log(this.BioScience);
  }
  bioScienceStreamChemSelected(){
    this.populateBioScience();
    console.log(this.BioScience);
  }
  bioScienceStreamPhySelected(){
    this.populateBioScience();
    console.log(this.BioScience);
  }

  submit(){
    this.addDegreesForm.patchValue({bioScience:this.BioScience})
    let course = Object.assign({}, this.addDegreesForm.value);
    console.log(course);
  }

}

import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../_services/reports.service';

@Component({
  selector: 'app-testReport',
  templateUrl: './testReport.component.html',
  styleUrls: ['./testReport.component.css']
})
export class TestReportComponent implements OnInit {

  nextDisabled:Boolean;
  previousDisabled:Boolean;
  Fines:any;
  currentPage=1;
  pageSize=2;

  constructor(private reportService:ReportsService) { }

  ngOnInit() {
    this.previousDisabled=true;
    this.nextDisabled=true;
    this.getFines(this.currentPage);
    
    // if(this.Fines.length)
  }

  getFines(pageNo){
    this.reportService.getAllFines(pageNo)
    .subscribe(response=>{
      this.Fines=response;
      console.log(this.Fines.length);
      if(this.Fines.length==this.pageSize){
        this.nextDisabled=false;
      }
      else{
        this.nextDisabled=true;
      };
      },(error:Response)=>{
      console.log(error);
    })
  }

  nextPage(){
    this.currentPage++;
    this.getFines(this.currentPage);
    this.previousDisabled=false;
  }
  previousPage(){
    this.currentPage--;
    this.getFines(this.currentPage);
    if(this.currentPage==1){
      this.previousDisabled=true;
    }else{
      this.previousDisabled=false;
    }
  }
}

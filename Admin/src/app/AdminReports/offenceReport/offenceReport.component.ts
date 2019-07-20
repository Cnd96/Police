import { ReportsService } from './../../_services/reports.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offenceReport',
  templateUrl: './offenceReport.component.html',
  styleUrls: ['./offenceReport.component.css']
})
export class OffenceReportComponent implements OnInit {

  constructor(private reportsService:ReportsService) { }

  offences:any;
  ngOnInit() {
    this.getOffenceReport()
  }

  getOffenceReport(){
    this.reportsService.getOffenceReport()
    .subscribe(response=>{
      this.offences=response;
      console.log(this.offences);
    },(error:Response)=>{
    })
  }

}

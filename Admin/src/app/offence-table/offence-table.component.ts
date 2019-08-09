import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { OffenceTableDataSource } from './offence-table-datasource';
import { OffenceService } from '../_services/offence.service';
import { BaseRowDef } from '@angular/cdk/table';
import { CreateOffenceComponent } from '../createOffence/createOffence.component';

@Component({
  selector: 'app-offence-table',
  templateUrl: './offence-table.component.html',
  styleUrls: ['./offence-table.component.css']
})
export class OffenceTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: OffenceTableDataSource;

  displayedColumns =  ['sectionOfAct', 'provision','amount','actions'];
  constructor(private offenceService:OffenceService,private dialog : MatDialog) { }

  ngOnInit() {
    this.dataSource = new OffenceTableDataSource(this.paginator, this.sort, this.offenceService);
  }
  onUpdate(row){
    this.offenceService.offenceId=row._id;
    console.log(row._id);
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    this.dialog.open(CreateOffenceComponent, dialogConfig);
  }
}

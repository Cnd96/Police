import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { OffenceTableDataSource } from './offence-table-datasource';
import { OffenceService } from '../_services/offence.service';

@Component({
  selector: 'app-offence-table',
  templateUrl: './offence-table.component.html',
  styleUrls: ['./offence-table.component.css']
})
export class OffenceTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: OffenceTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns =  ['sectionOfAct', 'provision','amount'];
  constructor(private offenceService:OffenceService) { }
  ngOnInit() {
    this.dataSource = new OffenceTableDataSource(this.paginator, this.sort, this.offenceService);
  }

  // err(){
  //   this.offenceService.getOffences()
  //   .subscribe(
  //     (response)=>console.log(response),
  //     (error)=>console.log(error)
  //   );
  // }
}

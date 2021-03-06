// import { AddDegreesComponent } from './addDegrees/addDegrees.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ExportAsModule } from 'ngx-export-as';
 
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { CustomMaterialModule } from './materialModules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './navBar/navBar.component';
import { FinesComponent } from './fines/fines.component';
import { TrafficPolicemenComponent } from './trafficPolicemen/trafficPolicemen.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { TrafficPolicemenTableComponent } from './traffic-policemen-table/traffic-policemen-table.component';
import { CreatePolicemanComponent } from './createPoliceman/createPoliceman.component';
import { ViewTrafficPolicemanComponent } from './viewTrafficPoliceman/viewTrafficPoliceman.component';
import { UnpaidFinesTableComponent } from './unpaid-fines-table/unpaid-fines-table.component';
import { PaidFinesTableComponent } from './paid-fines-table/paid-fines-table.component';
import { PayUnpaidFineComponent } from './payUnpaidFine/payUnpaidFine.component';
import { ConfirmDialogComponent } from './confirmDialog/confirmDialog.component';
import { MessageDialogComponent } from './messageDialog/messageDialog.component';
import { TestReportComponent } from './testReport/testReport.component';
import { TPUnpaidFinesTableComponent } from './tp-unpaid-fines-table/tp-unpaid-fines-table.component';
import { TPPaidFinesTableComponent } from './tp-paid-fines-table/tp-paid-fines-table.component';
import { RecordFineComponent } from './RecordFine/RecordFine.component';

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { RecordComponent } from './record/record.component';
import { ViewfineComponent } from './viewfine/viewfine.component';
import { UpdateToCourtCaseComponent } from './updateToCourtCase/updateToCourtCase.component';
import { UnPaidCourtTableComponent } from './un-paid-court-table/un-paid-court-table.component';
import { PaidCourtTableComponent } from './paid-court-table/paid-court-table.component';
import { UpdateCourtDateComponent } from './updateCourtDate/updateCourtDate.component';
import { SettleCourtCaseComponent } from './settleCourtCase/settleCourtCase.component';
import { RecordCourtCaseComponent } from './recordCourtCase/recordCourtCase.component';
import { ReportsComponent } from './reports/reports.component';
import { PlaceReportsComponent } from './placeReports/placeReports.component';
import { PolicemanReportsComponent } from './policemanReports/policemanReports.component';
import { TimereportsComponent } from './timereports/timereports.component';
import { UpdatePolicemanComponent } from './updatePoliceman/updatePoliceman.component';

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      HomeComponent,
      NavBarComponent,
      FinesComponent,
      TrafficPolicemenComponent,
      TrafficPolicemenTableComponent,
      CreatePolicemanComponent,
      ViewTrafficPolicemanComponent,
      UnpaidFinesTableComponent,
      PaidFinesTableComponent,
      PayUnpaidFineComponent,
      ConfirmDialogComponent,
      MessageDialogComponent,
      TestReportComponent,
      TPUnpaidFinesTableComponent,
      TPPaidFinesTableComponent,
      RecordFineComponent,
      RecordComponent,
      ViewfineComponent,
      UpdateToCourtCaseComponent,
      UnPaidCourtTableComponent,
      PaidCourtTableComponent,
      UpdateCourtDateComponent,
      SettleCourtCaseComponent,
      RecordCourtCaseComponent,
      ReportsComponent,
      PlaceReportsComponent,
      PolicemanReportsComponent,
      TimereportsComponent,
      UpdatePolicemanComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      RouterModule.forRoot(appRoutes),
      CustomMaterialModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      ExportAsModule,
      NgxMaterialTimepickerModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [
      ViewfineComponent,
      CreatePolicemanComponent,
      UpdateCourtDateComponent,
      SettleCourtCaseComponent,
      UpdateToCourtCaseComponent,
      ConfirmDialogComponent,
      MessageDialogComponent//fordialogboxes
   ]
})
export class AppModule { }

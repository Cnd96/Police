import { AuthGuard } from './_services/AuthGuard.service';
import { PoliceStationService } from './_services/policeStation.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { OffenceService } from './_services/offence.service';
import { AuthService } from './_services/auth.service';

import { CustomMaterialModule } from './materialModules/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './navBar/navBar.component';
import { OffencesComponent } from './offences/offences.component';
import { PoliceStationComponent } from './policeStation/policeStation.component';
import { OffenceTableComponent } from './offence-table/offence-table.component';

import { PoliceStationsTableComponent } from './police-stations-table/police-stations-table.component';
import { CreatePoliceStationComponent } from './createPoliceStation/createPoliceStation.component';
import { OicDivisionService } from './_services/oicDivision.service';
import { CreateOffenceComponent } from './createOffence/createOffence.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { ConfirmDialogComponent } from './confirmDialog/confirmDialog.component';
import { MessageDialogComponent } from './messageDialog/messageDialog.component';
import { ReportsComponent } from './reports/reports.component';
import { OffenceReportComponent } from './AdminReports/offenceReport/offenceReport.component';
import { ViewPoliceStationComponent } from './viewPoliceStation/viewPoliceStation.component';
import { TrafficPolicemanTableComponent } from './traffic-policeman-table/traffic-policeman-table.component';

import { PoliceStationIncomeComponent } from './AdminReports/policeStationIncome/policeStationIncome.component';

import { CategoryService, ColumnSeriesService } from '@syncfusion/ej2-angular-charts';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { AccumulationChartModule } from '@syncfusion/ej2-angular-charts';
import { PieSeriesService, AccumulationLegendService, AccumulationTooltipService, AccumulationAnnotationService,
  AccumulationDataLabelService } from '@syncfusion/ej2-angular-charts';

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      HomeComponent,
      NavBarComponent,
      OffencesComponent,
      PoliceStationComponent,
      OffenceTableComponent,
      PoliceStationsTableComponent,
      CreatePoliceStationComponent,
      CreateOffenceComponent,
      ConfirmDialogComponent,
      MessageDialogComponent,
      ReportsComponent,
      OffenceReportComponent,
      ViewPoliceStationComponent,
      TrafficPolicemanTableComponent,
      PoliceStationIncomeComponent
   ],
   imports: [
      BrowserModule,
      RouterModule.forRoot(appRoutes),
      BrowserAnimationsModule,
      CustomMaterialModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      ChartModule,
      AccumulationChartModule
   ],
   providers: [
      CategoryService,
      ColumnSeriesService,
      AuthService,
      OffenceService,
      PoliceStationService,
      OicDivisionService,
      AuthGuard,
      PieSeriesService, AccumulationLegendService, AccumulationTooltipService, AccumulationDataLabelService,
      AccumulationAnnotationService
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [
      CreateOffenceComponent,
      CreatePoliceStationComponent,
      ConfirmDialogComponent,
      MessageDialogComponent
   ]
})
export class AppModule { }

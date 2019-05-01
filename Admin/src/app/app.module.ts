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
import { OffenceComponent } from './offence/offence.component';
import { PoliceStationsTableComponent } from './police-stations-table/police-stations-table.component';
import { CreatePoliceStationComponent } from './createPoliceStation/createPoliceStation.component';
import { OicDivisionService } from './_services/oicDivision.service';
import { ConfirmDialogComponent } from './confirmDialog/confirmDialog.component';


@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      HomeComponent,
      NavBarComponent,
      OffencesComponent,
      PoliceStationComponent,
      OffenceTableComponent,
      OffenceComponent,
      PoliceStationsTableComponent,
      CreatePoliceStationComponent,
      ConfirmDialogComponent
   ],
   imports: [
      BrowserModule,
      RouterModule.forRoot(appRoutes),
      BrowserAnimationsModule,
      CustomMaterialModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule
   ],
   providers: [
      AuthService,
      OffenceService,
      PoliceStationService,
      OicDivisionService
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [
      OffenceComponent,
      //fordialogbox\nCreatePoliceStationComponent
   ]
})
export class AppModule { }

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { OffenceService } from './_services/offence.service';
import { AuthService } from './_services/auth.service';

import { CustomMaterialModule } from './core/material.module';
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
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { OffenceComponent } from './offence/offence.component';


@NgModule({
   declarations: [
      AppComponent,
      LoginComponent ,
      HomeComponent,
      NavBarComponent,
      OffencesComponent,
      PoliceStationComponent,
      OffenceTableComponent,
      OffenceComponent
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
      MatSortModule
   ],
   providers: [
      AuthService,
      OffenceService
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents:[OffenceComponent]

})
export class AppModule { }

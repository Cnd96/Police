
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { CustomMaterialModule } from './core/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './navBar/navBar.component';
import { FinesComponent } from './fines/fines.component';
import { TrafficPolicemenComponent } from './trafficPolicemen/trafficPolicemen.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { TrafficPolicemenTableComponent } from './traffic-policemen-table/traffic-policemen-table.component';
import { CreatePolicemanComponent } from './createPoliceman/createPoliceman.component';

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      HomeComponent,
      NavBarComponent,
      FinesComponent,
      TrafficPolicemenComponent,
      TrafficPolicemenTableComponent,
      CreatePolicemanComponent
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
      MatSortModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [
      CreatePolicemanComponent //fordialogbox
      
   ]
})
export class AppModule { }

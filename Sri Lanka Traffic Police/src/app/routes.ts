// import { AddDegreesComponent } from './addDegrees/addDegrees.component';
import { ViewTrafficPolicemanComponent } from './viewTrafficPoliceman/viewTrafficPoliceman.component';
import { FinesComponent } from './fines/fines.component';

import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TrafficPolicemenComponent } from './trafficPolicemen/trafficPolicemen.component';
import { PayUnpaidFineComponent } from './payUnpaidFine/payUnpaidFine.component';
import { TestReportComponent } from './testReport/testReport.component';
import { RecordFineComponent } from './RecordFine/RecordFine.component';
import { RecordComponent } from './record/record.component';
import { RecordCourtCaseComponent } from './recordCourtCase/recordCourtCase.component';
import { ReportsComponent } from './reports/reports.component';


export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'fines', component: FinesComponent},
    {path: 'trafficPolicemen', component: TrafficPolicemenComponent},
    {path: '', component: LoginComponent},
    {path:'viewTrafficPoliceman/:trafficPolicemanId',component:ViewTrafficPolicemanComponent},
    {path:'payUnpaidFine/:unpaidFineId',component:PayUnpaidFineComponent},
    {path:'recordFine/:licenseNo',component:RecordFineComponent},
    {path:'recordCourtCase/:licenseNo',component:RecordCourtCaseComponent},
    {path:'reports',component:ReportsComponent},
    {path:'searchDriver',component:RecordComponent},
    {path:'testReport',component:TestReportComponent},
    // {path:'add',component:AddDegreesComponent},
    {path: '**', redirectTo: 'home', pathMatch: 'full'},
];

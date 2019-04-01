import { FinesComponent } from './fines/fines.component';

import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TrafficPolicemenComponent } from './trafficPolicemen/trafficPolicemen.component';


export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'fines', component: FinesComponent},
    {path: 'trafficPolicemen', component: TrafficPolicemenComponent},
    {path: '', component: LoginComponent},
    {path: '**', redirectTo: 'home', pathMatch: 'full'},
];

import { AuthGuard } from './_services/AuthGuard.service';
import { OffencesComponent } from './offences/offences.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {Routes} from '@angular/router';
import { PoliceStationComponent } from './policeStation/policeStation.component';

export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent,canActivate:[AuthGuard]},
    {path: 'offences', component: OffencesComponent,canActivate:[AuthGuard]},
    {path: 'policestations', component: PoliceStationComponent,canActivate:[AuthGuard]},
    {path: '', component: LoginComponent},

    {path: '**', redirectTo: 'home', pathMatch: 'full'},
];

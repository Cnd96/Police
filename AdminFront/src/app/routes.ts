import { OffencesComponent } from './offences/offences.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {Routes} from '@angular/router';
import { PoliceStationComponent } from './policeStation/policeStation.component';

export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'home/offences', component: OffencesComponent},
    {path: 'home/policestations', component: PoliceStationComponent},
    {path: '', component: LoginComponent},
    {path: '**', redirectTo: 'home', pathMatch: 'full'},
];

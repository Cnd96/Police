import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {Routes} from '@angular/router';

export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: '', component: LoginComponent},
    {path: '**', redirectTo: 'home', pathMatch: 'full'},
];

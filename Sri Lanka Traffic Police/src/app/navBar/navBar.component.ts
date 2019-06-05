import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-navBar',
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  ShowHomeComponent(){ this.router.navigate(['/home']);}
  ShowFinesComponent(){this.router.navigate(['/fines']);}
  ShowTrafficPolicemenComponent(){this.router.navigate(['/trafficPolicemen']);}
  ShowRecordFinesForm(){this.router.navigate(['/searchDriver']);}

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}



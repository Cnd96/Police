import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navBar',
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.css']
})
export class NavBarComponent implements OnInit {
  navbarOpen = false;
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  constructor(private router: Router) { }

  ngOnInit() {
  }
  ShowOffencesComponent(){
    this.router.navigate(['/offences']);
  }
  ShowPoliceStationComponent(){
    this.router.navigate(['/policestations']);
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('tokenAdmin');
    this.router.navigate(['']);
  }
}

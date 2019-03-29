import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  policeLogo:string="/assets/img/policeLogo.png" ;
  errors=false;
  
  model:any={};
  constructor(private authservice:AuthService ,private router: Router) { }

  ngOnInit() {
  }

  login(){

    this.router.navigate(['/home']);
    // this.authservice.login(this.model).subscribe(next=>{
    //   this.router.navigate(['/home']);
    // }, error=>{
    //   this.errors= true;
    //   console.log('log failed');
    // });
    
  }
}

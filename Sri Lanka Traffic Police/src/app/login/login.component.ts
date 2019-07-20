import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model:any={};
  errors=false;
  policemanDetailsErrors=false;
  constructor(private authservice:AuthService ,private router: Router) { }


  ngOnInit() {
  }

  login(){
    // this.router.navigate(['/home']);
    this.authservice.login(this.model).subscribe(next=>{
      this.router.navigate(['/home']);
    },(error:Response)=>{
      
      if(error.status===400){
        this.errors= true;
        console.log(error);
      }if(error.status===404){
        this.policemanDetailsErrors= true;
        console.log(error);
      }
      else alert('Unexpected error found');
    });
    
  }
}

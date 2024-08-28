import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb:FormBuilder ,private api:ApiService , private router:Router){}


  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })

  login(){

    // console.log(this.loginForm);
    
    this.api.loginUser(this.loginForm.value).subscribe({
      next:(res:any)=>{
        alert('login successfull');
        this.router.navigateByUrl('/')
        sessionStorage.setItem("token",res.token)
        sessionStorage.setItem("existingUser",JSON.stringify(res.existingUser))

        // console.log(res.existingUser);
        
      },
      error:(err)=>{
        console.log(err);
        alert('something went wrong')
      }
    })
  }
}

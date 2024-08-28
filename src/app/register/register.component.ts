import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  // userDetails:any={
  //   username:'',
  //   email:'',
  //   password:''
  // }

  constructor(private api: ApiService, private fb: FormBuilder,private router:Router) {}

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
  });

  register() {
    // this.api.registerUser(userDetails)
    // console.log(this.userDetails);

    if (this.registerForm.valid) {
      // console.log(this.registerForm);
      this.api.registerUser(this.registerForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          alert('registration successfull')
          this.router.navigateByUrl('/login')

     
        },
        error: (err) => {
          console.log(err.status);
          alert('something went wrong')
        },
      });
    } else {
      alert('fill the form');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, LoginPayload } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form!: FormGroup; // tell TypeScript form will always be initialized before usage
  isSignupMode = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(6)]
      })
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    const email = this.form.value.email;
    const password = this.form.value.password;
  
    if (this.isSignupMode) {
      this.authService.register({email, password}).then(user => {
        if(user){
          // Handle successful registration
        } else {
          // Handle failed registration
        }
      });
    } else {
      this.authService.login({email, password}).then(user => {
        if(user){
          // Handle successful login
        } else {
          // Handle failed login
        }
      });
    }
  }
  

  toggleMode() {
    this.isSignupMode = !this.isSignupMode;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importer Router ici
import { AuthService, LoginPayload } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form!: FormGroup;
  isSignupMode = false;

  constructor(
    private authService: AuthService, 
    private router: Router  // Injecter Router ici
  ) {}

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

  async onSubmit() {
    if (!this.form.valid) {
      return;
    }
    const email = this.form.value.email;
    const password = this.form.value.password;
  
    if (this.isSignupMode) {
      const userCredential = await this.authService.register({email, password});
      if(userCredential) {
        // Handle successful registration
        // Check if user is logged in
        const user = userCredential.user;
        if (user) {
          // User is signed in, redirect to home
          this.router.navigate(['/home']);
        } else {
          // User is not signed in, handle this case
        }
      } else {
        // Handle failed registration
      }
    } else {
      const userCredential = await this.authService.login({email, password});
      if(userCredential) {
        // Handle successful login
        // Check if user is logged in
        const user = userCredential.user;
        if (user) {
          // User is signed in, redirect to home
          this.router.navigate(['/home']);
        } else {
          // User is not signed in, handle this case
        }
      } else {
        // Handle failed login
      }
    }
  }

  toggleMode() {
    this.isSignupMode = !this.isSignupMode;
  }
}

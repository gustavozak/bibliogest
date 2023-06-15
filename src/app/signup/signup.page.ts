import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.signupForm.valid) {
      try {
        const userCredential = await this.authService.register(this.signupForm.value);
        if (userCredential) {
          // Signup succeeded. Redirect to the home page or dashboard.
          this.router.navigate(['/home']);
        } else {
          // Signup failed. Show an error message.
          console.error('Signup failed');
        }
      } catch (e) {
        // There was an error signing up. Show an error message.
        console.error(e);
      }
    }
  }
}

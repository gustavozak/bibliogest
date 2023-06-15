import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, UserCredential } from '@angular/fire/auth';

export interface LoginPayload {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  async register(payload: LoginPayload): Promise<UserCredential | null> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        payload.email,
        payload.password
      );
      return userCredential;
    } catch (e) {
      console.error(e); // You might want to do something more sophisticated with error handling
      return null;
    }
  }

  async login(payload: LoginPayload): Promise<UserCredential | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        payload.email,
        payload.password
      );
      return userCredential;
    } catch (e) {
      console.error(e); // You might want to do something more sophisticated with error handling
      return null;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (e) {
      console.error(e); // You might want to do something more sophisticated with error handling
    }
  }
}

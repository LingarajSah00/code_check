import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object) {}

  // Simulated login function (replace with a real authentication mechanism)
  login(username: string, password: string): boolean {
    // Simulate a simple hardcoded check for login (you can replace this logic with an API call)
    if (username === 'admin' && password === 'admin') {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('isLoggedIn', 'true');
      }
      return true;
    }
    return false;
  }

  // Logout function
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('isLoggedIn');
    }
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('isLoggedIn') === 'true';
    }
    return false;
  }

  // getSAMLRequest(): Observable<{ authN: string }> {
  //   return this.http.get<{ authN: string }>('api/auth/saml-request'); // Adjust URL as needed
  // }
  
  setAuthentication(params: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('jwtToken', params.jwtToken);
    }
  }
  getAuthentication(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('jwtToken');
    }
    return null;
  }
  removeAuthentication(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('jwtToken');
    }
  }

  
  checkExpiredToken(): boolean {
    const token = this.getAuthentication();
    if (!token) return true;
  
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp;
    return (Date.now() / 1000) > expiry;
  }
}

import { CanActivateFn } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // This makes the guard globally available in the DI system
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Ensure localStorage is only accessed in browser
    if (typeof window !== 'undefined' && window.localStorage) {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        return true; // Allow access if auth token exists
      } else {
        this.router.navigate(['/login']);
        return false; // Deny access if auth token doesn't exist
      }
    }

    //console.error('LocalStorage is not available');
    return false; // If localStorage is not available, deny access
  }
}

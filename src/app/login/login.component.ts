import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // <-- Import FormsModule here
import { CommonModule } from '@angular/common';  // Import CommonModule for *ngIf
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field'; // mat-label is part of MatFormFieldModule
import { MatIconModule } from '@angular/material/icon';  // Import MatIconModule
import { MatButtonModule } from '@angular/material/button';
import { UserData } from '../model/user.model';
import { MatSelectModule } from '@angular/material/select';
import { error } from 'console';
import { environment } from '../../environments/environment';  // Import environment

@Component({
  selector: 'app-login',
  imports: [MatSelectModule,CommonModule,FormsModule,CommonModule,MatInputModule,MatFormFieldModule,ReactiveFormsModule,MatIconModule,MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  showLoginForm: boolean = false;  // Controls visibility of the login form
  showAlert: boolean = false;
  alertType: string = 'error';  // Hardcoded alert type (error, success, etc.)
  alertMessage: string = 'Sorry, you do not have access to the application at this moment. Please try again later!';
  selectedRole: string = '';  // Store selected role
  roles: string[] = ['compuser','viewonly','superuser'];  // Define roles


  constructor(private aRouter:ActivatedRoute, private authService:AuthService,  private router: Router) {}

  currentUser: UserData = {
      userId: 'emplo000000000137158',
      username: '1468808',
      fullName: 'Brian Kearney',
      userStatus: 'Active',
      securityRoles: [
      
      ],
      email: 'abc@cvshealth.com',
      jobName: 'Mgr,Corp Compliance (IC)',
      orgName: 'Compliance / Industry Integrity Corp Compliance'
    };
  
  //
  // This function will trigger the alert when the "Login to SSO" button is clicked
  onLoginSSO() {
    this.currentUser.securityRoles = [this.selectedRole];  // Update securityRoles array

    localStorage.setItem('currentUserRole', JSON.stringify(this.currentUser));

    this.alertType = 'error';  // For error alert
  this.alertMessage = 'Sorry, you do not have access to the application at this moment. Please try again later!';

    // Set showAlert to true to display the red alert box
    this.showAlert = true;

    // Optionally, hide the alert after a few seconds
    setTimeout(() => {
      this.showAlert = false; // Hide the alert box after 5 seconds
    }, 5000); // 5000 ms = 5 seconds

     // Redirect to the dashboard after the alert is shown
     setTimeout(() => {
      this.router.navigateByUrl('/dashboard');  // Navigate to dashboard
    }, 1000);  // Delay the navigation by 1 second after showing the alert


  //    // Step 1: Call backend to get SAML Request
  // this.authService.getSAMLRequest().subscribe({
  //   next: (res: { authN: string }) => {
  //     this.redirectToIdp(res.authN);  // Step 2: Redirect to IDP
  //   },
  //   error: (err) => {
  //     console.error('Error during SAML request:', err);
  //     this.showAlert = true;
  //     this.alertType = 'error';
  //     this.alertMessage = 'SSO Login failed. Please try again.';
  //   }
  // });
  }
//   onSubmit() {
//     this.currentUser.securityRoles = [this.selectedRole];  // Update securityRoles array

//  // Check the username and password (this example uses hardcoded values)
//  const isAuthenticated = this.authService.login(this.username, this.password);
//  if (isAuthenticated) {

//    // Store token in localStorage and redirect to dashboard
//    localStorage.setItem('authToken', 'isLoggedIn');
//    localStorage.setItem('currentUserRole', JSON.stringify(this.currentUser));

//    this.router.navigateByUrl('/dashboard');
//  } else {
//    // Display error message if authentication fails
//    this.errorMessage = 'Invalid username or password';
//  }

 
//   }

  ngOnInit(): void {
    this.aRouter.queryParamMap.subscribe({
      next: (res) => {
        const jwtToken = res.get('jwtToken');
  
        // Clear expired sessions
        if (this.authService.checkExpiredToken()) {
          this.authService.removeAuthentication();
        }
  
        // Step 3: Handle incoming jwtToken from IDP
        if (
          jwtToken &&
          !this.authService.getAuthentication() &&
          document.referrer === environment.IDP_REFERER
        ) {
          this.authService.setAuthentication({ jwtToken });  // Save JWT
  
          if (this.authService.getAuthentication()) {
            this.router.navigate(['/dashboard']);  // Authenticated route
          } else {
            this.router.navigate(['/login']);  // Fallback
          }
        } else if (this.authService.getAuthentication()) {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        console.error("Authentication failed", error);
        this.router.navigate(['/rrtSamlLogin']);
      }
    });
  }
  

  // generateSAMLRequest() {
  //   // Generate a SAML request (this is a placeholder, replace with actual SAML request generation)
  //   //this.loaded = true;
  //   this.rest.subscribe(
  //     {
  //       next:(res:{authN:string})=>{
  //         this.redirectToIdp  (res.authN)
  //       },
  //       error()=>{
  //         this.router.navigateByUrl('/error')
  //     }
  // }
  

  createSAMLForm(actionUrl: string, samlRequest: string): HTMLFormElement {
    // Create a SAML form dynamically
    const form = document.createElement('form');
    form.setAttribute('method', 'POST');
    form.setAttribute('action', actionUrl); // Replace with your SAML endpoint 
    form.setAttribute('enctyp', 'application/x-www-form-urlencoded'); // Hide the form

    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', 'SAMLRequest');
    input.setAttribute('value', btoa(samlRequest)); // Replace with actual SAML request value
    form.appendChild(input);
    return form;
  }

  redirectToIdp(authNRequest: string) {
   console.log('Redirecting to IDP with request:', authNRequest);
   const samlRequest=authNRequest;  
   const idpSSOUrl = environment.IDP_URL; // Replace with your IDP SSO URL
   const form = this.createSAMLForm(idpSSOUrl, samlRequest);
    document.body.appendChild(form);

    setTimeout(() => {
      form.submit();
    }
    , 100); // Delay the form submission by 1 second
    // Optionally, remove the form from the DOM after submission
  }

}
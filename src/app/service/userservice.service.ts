import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from '../model/user.model';  // Import the UserData model
import { environment } from '../../environments/environment';  // Import environment

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  private apiUrl = environment.apiUrl;  // Access the API URL from environment file

  //private baseUrl = 'http://localhost:8080/user/';

  constructor(private http: HttpClient) { }

  // Get all users
  getUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>(`${this.apiUrl}/user/`);  // Use the dynamic apiUrl
  }
  
  getUsersPaginated(page: number, size: number): Observable<any> {
    return this.http.get<any>(`/api/users?page=${page}&size=${size}`);
  }
  
  // Search users based on path variable
  searchUser(pathVariable: string): Observable<UserData[]> {
    const searchUrl = `${this.apiUrl}/user/${pathVariable}`;  // Use the dynamic apiUrl
    return this.http.get<UserData[]>(searchUrl);
  }

   // Method to add a new user via POST request
   addUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/`, userData);
  }

   // Edit User (PUT)
   editUser(userId: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`, updatedData);
  }

  // Delete User (DELETE)
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }
}

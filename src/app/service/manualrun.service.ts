import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';  // Import environment

@Injectable({
  providedIn: 'root'
})
export class ManualrunService {
  private apiUrl = `${environment}/manualrun/submit`; // Set your API URL here

  constructor(private http: HttpClient) { }

  // Post method to submit form data
  postData(formData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }
}

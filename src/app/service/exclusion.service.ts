import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';  // Import environment
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ELTData } from '../model/elt.model';

@Injectable({
  providedIn: 'root'
})
export class ExclusionService {
  private apiUrl = `${environment}/exclusion`; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Create a new record (User or Maintenance)
  createRecord(data: ELTData): Observable<ELTData> {
    return this.http.post<ELTData>(this.apiUrl, data);
  }

   // Update an existing record (User or Maintenance)
   updateRecord(id: number, data: ELTData): Observable<ELTData> {
    return this.http.put<ELTData>(`${this.apiUrl}/${id}`, data); // Include the ID in the URL
  }

  // Delete an existing record
  deleteRecord(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`); // The ID is included in the URL to target the resource
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';  // Import environment

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  private apiUrl = `${environment}/maintenance`; // Set your API URL here

  constructor(private http: HttpClient) {}

    // Post method to add maintenance record
    addMaintenance(maintenanceData: any): Observable<any> {
      return this.http.post<any>(this.apiUrl, maintenanceData);
    }

    // PUT method to edit an existing maintenance record
  editMaintenance(maintenanceId: number, maintenanceData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${maintenanceId}`, maintenanceData);
  }

  // DELETE method to delete an existing maintenance record
  deleteMaintenance(maintenanceId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${maintenanceId}`);
  }
}

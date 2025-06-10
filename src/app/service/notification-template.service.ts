import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationTemplate } from '../model/notification.template.model';
import { environment } from '../../environments/environment';  // Import environment

@Injectable({
  providedIn: 'root'
})
export class NotificationTemplateService {

  private baseUrl = `${environment.apiUrl}/notification/template`;  // Base URL from environment, with the API path appended

  constructor(private http: HttpClient) {}

  // Get all notification templates
  getAllTemplates(): Observable<NotificationTemplate[]> {
    return this.http.get<NotificationTemplate[]>(`${this.baseUrl}`);
  }

  // Get a specific notification template by ID
  getTemplateById(id: number): Observable<NotificationTemplate> {
    return this.http.get<NotificationTemplate>(`${this.baseUrl}/${id}`);
  }

   // POST request to create a new notification template
   createTemplate(template: NotificationTemplate): Observable<NotificationTemplate> {
    return this.http.post<NotificationTemplate>(this.baseUrl, template);
  }

   // Update a template
   updateTemplate(template: NotificationTemplate): Observable<NotificationTemplate> {
    // Assuming template.id is the identifier
    return this.http.put<NotificationTemplate>(`${this.baseUrl}/${template.id}`, template);
  }

   // Delete a template
   deleteTemplate(templateId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${templateId}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ELTData } from '../model/elt.model';
import { Setting } from '../model/setting.model';
import { ListOption } from '../model/list-option.model';
import { environment } from '../../environments/environment';  // Import environment
import { NotificationTemplate } from '../model/notification.template.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = environment.apiUrl;  // Base URL from environment

  //private apiUrl = 'http://localhost:8080/notification/personexception/'; // Change to your actual API base URL
  //private settingApiUrl = 'http://localhost:8080/notification/setting/'; // Change to your actual API base URL
  //private listOptionUrl = 'http://localhost:8080/notification/listoption/'; // New API endpoint for list options

  constructor(private http: HttpClient) { }

   // Get all person exceptions
   getPersonExceptions(): Observable<ELTData[]> {
    const url = `${this.apiUrl}/notification/personexception`;  // Append path to base URL
    return this.http.get<ELTData[]>(url);
  }


  // Get person exception by username
  getPersonExceptionByUsername(username: string): Observable<ELTData[]> {
    const url = `${this.apiUrl}/notification/personexception/${username}`;
    return this.http.get<ELTData[]>(url);
  }


 // Fetch all settings
 getAllSettings(): Observable<Setting[]> {
  const url = `${this.apiUrl}/notification/setting`;  // Append path to base URL
  return this.http.get<Setting[]>(url);
}

  // Fetch a setting by name
  getSettingByName(name: string): Observable<Setting> {
    const url = `${this.apiUrl}/notification/setting/${name}`;
    return this.http.get<Setting>(url);
  }

   // Fetch all list options
   getAllListOptions(): Observable<ListOption[]> {
    const url = `${this.apiUrl}/notification/listoption`;  // Append path to base URL
    return this.http.get<ListOption[]>(url);
  }

  // Fetch a list option by name
  getListOptionByName(name: string): Observable<ListOption> {
    const url = `${this.apiUrl}/notification/listoption/${name}`;
    return this.http.get<ListOption>(url);
  }

   

}

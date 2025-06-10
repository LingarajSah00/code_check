import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';  // Import environment
interface Campaign {
  id: number;
  name: string;
  description: string;
  type: String;
  status: string;
  template: string;
}
@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  private apiUrl = `${environment}/campaigns`; // Replace with your actual API URL



  constructor(private http: HttpClient) {}

  // Create campaign
  createCampaign(campaign: Campaign): Observable<Campaign> {
    return this.http.post<Campaign>(this.apiUrl, campaign);
  }

  // Edit campaign
  editCampaign(campaign: Campaign): Observable<Campaign> {
    return this.http.put<Campaign>(`${this.apiUrl}/${campaign.id}`, campaign);
  }

  // Delete campaign
  deleteCampaign(campaignId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${campaignId}`);
  }

  // Get all campaigns (for table)
  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(this.apiUrl);
  }
}

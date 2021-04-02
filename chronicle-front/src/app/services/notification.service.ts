import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TicketNotification } from '../models/TicketNotification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient:HttpClient) { }

  //for reciever(trainer or editor)
  findAllByReciever():Observable<TicketNotification[]>{
    return this.httpClient.get(environment.apiBase + environment.serverApiUrls.findAllByReciever) as Observable<TicketNotification[]>
  }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketNotification } from '../models/TicketNotification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient:HttpClient) { }

  //for editor
  submitNotification(notification:TicketNotification):Observable<TicketNotification>{
    return this.httpClient.post('',notification) as Observable<TicketNotification>
  }

  //for reciever(trainer)
  findAllByReciever():Observable<TicketNotification[]>{
    return this.httpClient.get('') as Observable<TicketNotification[]>
  }



}

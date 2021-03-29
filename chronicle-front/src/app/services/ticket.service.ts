import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../models/Ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private httpClient:HttpClient) { }

  //for trainers
  submitTickets(tickets:Ticket[]):Observable<Ticket[]>{
    return this.httpClient.post('',tickets) as Observable<Ticket[]>
  }

  //for editors
  findAllPendingTickets():Observable<Ticket[]>{
    return this.httpClient.get('') as Observable<Ticket[]>
  }

  //for trainers
  findUnderReviewTickets():Observable<Ticket[]>{
    return this.httpClient.get('') as Observable<Ticket[]>
  }

  //for trainers
  findAllSubmittedTickets():Observable<Ticket[]>{
    return this.httpClient.get('') as Observable<Ticket[]>
  }

  //for both
  updateTicketStatus(ticket:Ticket):Observable<Ticket>{
    return this.httpClient.post('',ticket) as Observable<Ticket>
  }

  //for editors
  findAllTicketsByEditor():Observable<Ticket[]>{
    return this.httpClient.get('') as Observable<Ticket[]>
  }
}

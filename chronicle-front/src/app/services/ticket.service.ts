import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ticket } from '../models/Ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private httpClient:HttpClient) { }

  //for trainers
  submitTickets(tickets:Ticket[]):Observable<Ticket[]>{
    return this.httpClient.post(environment.apiBase + environment.serverApiUrls.saveAllTickets ,tickets) as Observable<Ticket[]>
  }

  //for editors
  findAllPendingTickets():Observable<Ticket[]>{
    return this.httpClient.get(environment.apiBase + environment.serverApiUrls.getPendingTickets) as Observable<Ticket[]>
  }
  

  //for trainers
  findUnderReviewTickets():Observable<Ticket[]>{
    return this.httpClient.get(environment.apiBase + environment.serverApiUrls.getunderReviewTickets) as Observable<Ticket[]>
  }

  //for trainers
  findAllSubmittedTickets():Observable<Ticket[]>{
    return this.httpClient.get(environment.apiBase + environment.serverApiUrls.getSubmittedTickets) as Observable<Ticket[]>
  }

  //for both
  updateTicketStatus(ticket:Ticket):Observable<Ticket>{
    return this.httpClient.post(environment.apiBase + environment.serverApiUrls.updateTicket,ticket) as Observable<Ticket>
  }

<<<<<<< HEAD
  random()
  {
    
  }
  
=======
  //for editors
  findAllTicketsByEditor():Observable<Ticket[]>{
    return this.httpClient.get(environment.apiBase + environment.serverApiUrls.getAcceptedTickets) as Observable<Ticket[]>
  }

  //for trainers
  approveTicket(ticket:Ticket):Observable<Ticket[]>{
    return this.httpClient.post(environment.apiBase + environment.serverApiUrls.approveTicket,ticket) as Observable<Ticket[]>
  }

  //for trainers
  rejectTicket(ticket:Ticket):Observable<Ticket[]>{
    return this.httpClient.post(environment.apiBase + environment.serverApiUrls.rejectTicket,ticket) as Observable<Ticket[]>
  }

  //for trainers
  deactivateTicket(ticket:Ticket):Observable<Ticket[]>{
    return this.httpClient.post(environment.apiBase + environment.serverApiUrls.deactivateTicket,ticket) as Observable<Ticket[]>
  }
>>>>>>> 4045d3cc16a2e77fcd61940ee605a4ff563ea79c
}

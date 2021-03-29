import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from 'src/app/models/Ticket';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.css']
})
export class TicketViewComponent implements OnInit {

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.findAllPendingTickets();
  }

  allPendingTickets: Ticket[] = [];
  allMyTickets: Ticket[] = [];

  tempTicket:Ticket = new Ticket(0,0,0,"", "", "", "","", "", 0, "", "", "","");

  findAllPendingTickets(){
    this.ticketService.findAllPendingTickets().subscribe(
      (data) => {
        this.allPendingTickets = data;
      },
      () => {

      }
    )
  }

  findAllMyTickets(){
    this.ticketService.findAllTicketsByEditor().subscribe(
      (data) => {
        this.allMyTickets = data;
      },
      () => {

      }
    )
  }

  updateTicketStatusToAcknowledged(ticket:Ticket){
    ticket.ticketStatus = "ACKNOWLEDGED"
    this.tempTicket = ticket;

    this.ticketService.updateTicketStatus(ticket).subscribe(
      (data) => {
        console.log("ticket has been updated"+data)
      },
      () => {

      }
    )
  }

  updateTicketStatusToInProgress(ticket:Ticket){
    ticket.ticketStatus = "IN_PROGRESS"
    this.tempTicket = ticket;

    this.ticketService.updateTicketStatus(ticket).subscribe(
      (data) => {
        console.log("ticket has been updated"+data)
      },
      () => {

      }
    )
  }

  updateTicketStatusToUnderReview(ticket:Ticket){
    ticket.ticketStatus = "UNDER_REVIEW"
    this.tempTicket = ticket;

    this.ticketService.updateTicketStatus(ticket).subscribe(
      (data) => {
        console.log("ticket has been updated"+data)
      },
      () => {

      }
    )
  }

}

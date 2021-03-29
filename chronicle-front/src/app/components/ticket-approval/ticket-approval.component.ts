import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/Ticket';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-approval',
  templateUrl: './ticket-approval.component.html',
  styleUrls: ['./ticket-approval.component.css']
})
export class TicketApprovalComponent implements OnInit {

  underReviewTickets:Ticket[] =[]
  allSubmittedTickets:Ticket[]=[]

  tempTicket:Ticket = new Ticket(0,0,0,"", "", "", "","", "", 0, "", "", "","");
  rejectComment:String = "";

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.findUnderReviewTickets()
  }

  findUnderReviewTickets(){
    this.ticketService.findUnderReviewTickets().subscribe(
      (data) =>{
        this.underReviewTickets = data;
      },
      () =>{
        console.log("error in ticket approval component")
      }

    )
  }

   findAllSubmittedTickets(){
     this.ticketService.findAllSubmittedTickets().subscribe(
       (data)=>{
         this.allSubmittedTickets = data;
       },
       ()=>{
        console.log("error in ticket approval component")
       }
     )
   } 

  approveTicket(ticket:Ticket){
    ticket.ticketStatus = "APPROVED";
    this.tempTicket = ticket;

    this.ticketService.updateTicketStatus(ticket).subscribe(
      (data)=>{
        console.log("ticket has been updated" +data)
      },
      ()=>{

      }
    )
  }

  rejectTicket(ticket:Ticket,rejectComment:String){
    ticket.ticketStatus = "IN_PROGRESS";
    ticket.rejectComment = rejectComment;
    this.tempTicket = ticket;
    this.rejectComment = rejectComment;

    this.ticketService.updateTicketStatus(ticket).subscribe(
      (data)=>{
        console.log("ticket has been updated" +data)
      },
      ()=>{
        
      }
    )
  }

}

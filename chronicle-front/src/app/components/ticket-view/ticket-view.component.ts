import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ticket } from 'src/app/models/Ticket';
import { AuthService } from 'src/app/services/auth.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.css']
})
export class TicketViewComponent implements OnInit {

  constructor(private ticketService: TicketService, private authService:AuthService, private matSnackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.findAllPendingTickets();
    this.authService.User.subscribe(user1 => {
      this.user = user1;
    });
  }

  user: any;
  allPendingTickets: Ticket[] = [];
  allMyTickets: Ticket[] = [];
  tempTicket:Ticket = new Ticket(0,'0','0',new Date(),new Date(),"", "", "", "","", "", 0, "", "", "","");
  displayPending:boolean = true;
  pendings_nav_color = "orange";
  accepted_nav_color = "grey";
  errorMessage:string = "";
  hasError:boolean = false;
  tempUploadedVideo: any;
  

  toggleDisplayPending(b:boolean){
    this.displayPending = b;
    if(b){
      this.findAllPendingTickets();
      this.pendings_nav_color = "orange";
      this.accepted_nav_color = "grey"
    }else{
      this.findAllMyTickets();
      this.pendings_nav_color =  "grey";
      this.accepted_nav_color = "orange"
    }
  }

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
        this.findAllMyTickets();
      },
      () => {
        console.log("Ticket Update Failed")
        this.findAllMyTickets();
      }
    )
  }

  acceptTicket(ticket:Ticket){
    ticket.ticketStatus = "ACKNOWLEDGED"
    this.ticketService.updateTicketStatus(ticket).subscribe(
      (data) => {
        this.findAllPendingTickets()
      },
      () => {
        this.findAllPendingTickets()
      }
    )
  }

  updateTicketStatusToInProgress(ticket:Ticket){
    ticket.ticketStatus = "IN_PROGRESS"
    this.tempTicket = ticket;

    this.ticketService.updateTicketStatus(ticket).subscribe(
      (data) => {
        console.log("ticket has been updated"+data)
        this.findAllMyTickets();
      },
      () => {
        console.log("Ticket Update Failed")
        this.findAllMyTickets();
      }
    )
  }

  updateTicketStatusToUnderReview(ticket:Ticket){
    if(ticket.ticketStatus == 'IN_PROGRESS' && ticket.clipID != 0){
      this.displayError();
      ticket.ticketStatus = "UNDER_REVIEW"
      this.tempTicket = ticket;
      this.ticketService.updateTicketStatus(ticket).subscribe(
        (data) => {
          console.log("ticket has been updated"+data)
          this.findAllMyTickets();
        },
        () => {
          this.findAllMyTickets();
        }
      )
    }else{
      this.errorMessage = "Please make sure the ticket is 'In progress', and it has a edited video.";
      this.displayError();
    }
    
  }

  displayError(){
    this.matSnackBar.open(this.errorMessage, "close")
  }



  linkVideoToTicket(ticket:Ticket, b:boolean){
    
    this.ticketService.updateClipForTicket(ticket).subscribe(
      (data) => {
        console.log("Ticket updated");
        this.displayError();
        this.findAllMyTickets();
        if(b){
          this.errorMessage = "The video has been updated!";
        }else{
          this.errorMessage = "A video has been linked to this ticket!";
        }
        
        this.displayError();
      },
      () => {
        this.errorMessage = "Unable to link a video. Make sure the 'title' of the video matches the 'topic'";
        this.displayError();
        this.findAllMyTickets();
      }
    )
  }

  

}

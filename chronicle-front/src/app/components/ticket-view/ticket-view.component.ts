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
      this.LoggedInUser = user1;
    });
  }

  //tempTicket is only for testing
  tempTicket:Ticket = new Ticket(0,'0','0',new Date(),new Date(),"", "", "", "","", "", 0, "", "", "","");

  //variables
  LoggedInUser: any;
  allPendingTickets: Ticket[] = [];
  allMyTickets: Ticket[] = [];
  displayPending:boolean = true;
  pendings_nav_color = "orange";
  accepted_nav_color = "grey";
  SnackBarMessage:string = "";
  
  //Toggle the table displayed and change the color of the mini nav bar
  toggleDisplayPending(displayPending:boolean){
    this.displayPending = displayPending;
    if(this.displayPending){
      this.findAllPendingTickets();
      this.pendings_nav_color = "orange";
      this.accepted_nav_color = "grey"
    }else{
      this.findAllMyTickets();
      this.pendings_nav_color =  "grey";
      this.accepted_nav_color = "orange"
    }
  }

  //this is called when the component is in
  findAllPendingTickets(){
    this.ticketService.findAllPendingTickets().subscribe(
      (data) => {
        this.allPendingTickets = data;
      },
      () => {
        this.SnackBarMessage = "Error occurred. Unable to get data.";
        this.displaySnackBar();
      }
    )
  }

  findAllMyTickets(){
    this.ticketService.findAllTicketsByEditor().subscribe(
      (data) => {
        this.allMyTickets = data;
      },
      () => {
        this.SnackBarMessage = "Error occurred. Unable to get data.";
        this.displaySnackBar();
      }
    )
  }

  //this is called when the user click on the check box of 'In progess' if it's checked
  updateTicketStatusToAcknowledged(ticket:Ticket){
    ticket.ticketStatus = "ACKNOWLEDGED"
    this.tempTicket = ticket;

    this.ticketService.updateTicketStatus(ticket).subscribe(
      (data) => {
        this.findAllMyTickets();
        this.SnackBarMessage = "The status has changed to 'acknowledged'.";
        this.displaySnackBar();
      },
      () => {
        this.SnackBarMessage = "Ticket Update Failed.";
        this.displaySnackBar();
        this.findAllMyTickets();
      }
    )
  }

  //this is called when the user clicks on 'accept'
  acceptTicket(ticket:Ticket){
    ticket.ticketStatus = "ACKNOWLEDGED"
    ticket.editorID = this.LoggedInUser.uid;
    this.ticketService.updateTicketStatus(ticket).subscribe(
      (data) => {
        this.findAllPendingTickets()
        this.SnackBarMessage = "The ticket has been accepted.";
        this.displaySnackBar();
      },
      () => {
        this.SnackBarMessage = "Error occurred. Unable to accept ticket.";
        this.displaySnackBar();
        this.findAllPendingTickets()
      }
    )
  }

  //this is called when the user clicks on the check box of 'In progess' if it's unchecked
  updateTicketStatusToInProgress(ticket:Ticket){
    ticket.ticketStatus = "IN_PROGRESS"
    this.tempTicket = ticket;

    this.ticketService.updateTicketStatus(ticket).subscribe(
      (data) => {
        this.findAllMyTickets();
        this.SnackBarMessage = "The status has changed to 'in progress'.";
        this.displaySnackBar();
      },
      () => {
        this.SnackBarMessage = "Ticket Update Failed.";
        this.displaySnackBar();
        this.findAllMyTickets();
      }
    )
  }

  //this is called when the user clicks on 'submit for review'
  updateTicketStatusToUnderReview(ticket:Ticket){
    if(ticket.ticketStatus == 'IN_PROGRESS' && ticket.clipID != 0){
      this.displaySnackBar();
      ticket.ticketStatus = "UNDER_REVIEW"
      this.tempTicket = ticket;
      this.ticketService.updateTicketStatus(ticket).subscribe(
        (data) => {
          this.SnackBarMessage = "Ticket has been submited.";
          this.displaySnackBar();
          this.findAllMyTickets();
        },
        () => {
          this.SnackBarMessage = "Ticket Update Failed.";
          this.displaySnackBar();
          this.findAllMyTickets();
        }
      )
    }else{
      this.SnackBarMessage = "Please make sure the ticket is 'In progress', and it has a edited video linked.";
      this.displaySnackBar();
    }
    
  }

  displaySnackBar(){
    this.matSnackBar.open(this.SnackBarMessage, "close")
  }


  //this is called when the user clicks on 'link video' or 'update'
  linkVideoToTicket(ticket:Ticket, b:boolean){
    
    this.ticketService.updateClipForTicket(ticket).subscribe(
      (data) => {
        this.displaySnackBar();
        this.findAllMyTickets();

        if(b){
          this.SnackBarMessage = "The video has been updated!";
        }else{
          this.SnackBarMessage = "A video has been linked to this ticket!";
        }
        this.displaySnackBar();
      },
      () => {
        this.SnackBarMessage = "Unable to link a video. Make sure the 'title' of the video matches the 'topic' of this ticket";
        this.displaySnackBar();
        this.findAllMyTickets();
      }
    )
  }

  

}

import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/Ticket';
import { TicketService } from 'src/app/services/ticket.service';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-ticket-approval',
  templateUrl: './ticket-approval.component.html',
  styleUrls: ['./ticket-approval.component.css']
})
export class TicketApprovalComponent implements OnInit {

  //Empty arrays to be populated
  underReviewTickets:Ticket[] =[]
  allSubmittedTickets:Ticket[]=[]

  displayWaitingForReview:boolean = true;
  waitingForReview_nav_color = "orange";
  inProgress_nav_color = "grey";

  clicked:boolean[] = [];
  deactivateClick:boolean[] = [];

  tempTicket:Ticket = new Ticket(0,'0','0',new Date(),new Date(),"ticket", "", "", "","", "", 0, "", "", "","");
  rejectComment:string = "";


  //Messages for snackbar
  approveMessage:string = "Must watch Edited Clip Before Approving Ticket";
  rejectMessage:string = "Must enter a comment to reject ticket";
  approveAfterMessage:string = "Successfully Accepted Clip";
  rejectAfterMessage:string = "Successfully Rejected Clip";
  deactivateMessage:string = "Click Confirm Deactivate Button to Deactivate Ticket";
  deactivateAfterMessage:string = "Successfully Deactivated Clip";

  action:string = "Close";

  constructor(private ticketService: TicketService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.findUnderReviewTickets()
  }



  toggleDisplayPending(b:boolean){
    this.displayWaitingForReview = b;
    if(this.displayWaitingForReview){
      this.findUnderReviewTickets();
      this.waitingForReview_nav_color = "orange";
      this.inProgress_nav_color = "grey"
    }else{
      this.findAllSubmittedTickets();
      this.waitingForReview_nav_color =  "grey";
      this.inProgress_nav_color = "orange"
    }
  }


  //Finds all the tickets that are under review and populates the underReviewTickets array
  findUnderReviewTickets(){
    this.ticketService.findUnderReviewTickets().subscribe(
      (data) =>{
        this.underReviewTickets = data;
        for(let i=0; i<this.underReviewTickets.length; i++){
          this.clicked.push(false);
          this.deactivateClick.push(false);
        }
      },
      () =>{
        console.log("error in ticket approval component")
      }

    )
  }

  //Finds all submitted tickets and populates allSubmittedTickets array
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

  //Function called and only call the service when the link is clicked
  approveTicket(ticket:Ticket,i:number){
    ticket.ticketStatus = "APPROVED";
    
    //This checks to see if link is clicked
    if(this.clicked[i]){
      this.ticketService.approveTicket(ticket).subscribe(
      (data)=>{
        this.openSnackBar(this.approveAfterMessage,this.action);
        console.log("ticket has been updated")
        this.findUnderReviewTickets();
      },
      ()=>{
        console.log("error in approving ticket")
      }
    )
    this.clicked[i] =false; 
    }else{
      //if trainer doesnt click link snackbar message is sent
      this.openSnackBar(this.approveMessage,this.action);
    }
  }

  //Function called and only calls the service if there is a comment in the comment box
  rejectTicket(ticket:Ticket){
    ticket.ticketStatus = "IN_PROGRESS";


    //Checks to see if comment box is empty else trainer gets a sandbar message
    if(ticket.rejectComment==""){
      this.openSnackBar(this.rejectMessage,this.action);
    }else{
      this.ticketService.rejectTicket(ticket).subscribe(
        (data)=>{
          this.openSnackBar(this.rejectAfterMessage,this.action);
          console.log("ticket has been updated")
          this.findUnderReviewTickets();
        },
        ()=>{
          
        }
      )
    }

  }

  deactivateTicket(ticket:Ticket, i:number){
    ticket.ticketStatus = "DEACTIVATED";
    this.ticketService.deactivateTicket(ticket).subscribe(
      (data)=>{
        this.openSnackBar(this.deactivateAfterMessage,this.action);
        console.log("ticket has been updated")
        this.findUnderReviewTickets();
      },
      ()=>{

      }
    )
      this.deactivateClick[i]=false;
  }

  linkedClick(i:number){
    this.clicked[i] = true;
  }


  deactivateButtonClick(i:number){
    this.openSnackBar(this.deactivateMessage,this.action);
    this.deactivateClick[i] = true;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  
}



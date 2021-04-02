import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Ticket } from 'src/app/models/Ticket';
import { TicketNotification } from 'src/app/models/TicketNotification';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-ticket-notification',
  templateUrl: './ticket-notification.component.html',
  styleUrls: ['./ticket-notification.component.css']
})
export class TicketNotificationComponent implements OnInit {
  tempTicket = new Ticket(1456789,'','',new Date(),new Date(),"", "", "", "","", '', 234, "", "", "","");
  tempNotification = (new TicketNotification(145678,'','', this.tempTicket, new Date(0), ''))
  constructor(private notificationService:NotificationService) { }

  ngOnInit(): void {
  }

  notifications:TicketNotification[] = [];


  submitNotification() {
    this.notificationService.submitNotification(this.tempNotification).subscribe(
      (data)=> {
        this.tempNotification = data;
      },
      ()=>{
        console.log("error submitting notification");
      }
    )
  }

  findAllByReciever(){
    this.notificationService.findAllByReciever().subscribe(
      (data)=>{
        this.notifications = data;
      },
      ()=>{
        console.log("error finding notifications by reciever");
      }
    )
  } 



}

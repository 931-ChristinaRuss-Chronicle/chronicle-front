import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Ticket } from 'src/app/models/Ticket';
import { TicketNotification } from 'src/app/models/TicketNotification';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-ticket-notification',
  templateUrl: './ticket-notification.component.html',
  styleUrls: ['./ticket-notification.component.css']
})
export class TicketNotificationComponent implements OnInit {
  tempTicket = new Ticket(1456789,'','',new Date(),new Date(),"", "", "", "","", '', 234, "", "", "","");
  tempNotification = (new TicketNotification(145678,'','', this.tempTicket, new Date(0), ''))
  constructor(private notificationService:NotificationService, private authService:AuthService) { }

  ngOnInit(): void {
    this.findAllByReciever()
    this.authService.User.subscribe(user1 => {
      this.user = user1;
      console.log(this.user.uid)
    });
  }

  user: any;

  notifications:TicketNotification[] = [];


 
  findAllByReciever(){
    this.notificationService.findAllByReciever().subscribe(
      (data)=>{
        this.notifications = data;
        console.log(data);
      },
      ()=>{
        console.log("error finding notifications by reciever");
      }
    )
  } 



}

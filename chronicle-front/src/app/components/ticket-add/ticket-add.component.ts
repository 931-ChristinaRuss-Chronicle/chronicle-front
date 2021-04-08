import { Component, Directive, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/models/Ticket';
import { AuthService } from 'src/app/services/auth.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-add',
  templateUrl: './ticket-add.component.html',
  styleUrls: ['./ticket-add.component.css']
})

export class TicketAddComponent implements OnInit {
 _zoomURL:string ='';
 _topicCount:number = 2;
 topicName:string = '';
 _returnTickets:Ticket[] = [];
passcode: string = '';
identifier: string = '';
topic: string = '';
startTime: string = '';
endTime: string = '';
description: string = '';
user:any;

ticket:Ticket  = new Ticket(0,'0','0',new Date(),new Date(),"","","","",this._zoomURL,this.passcode,0,"PENDING",this.identifier,"","");
tickets:Ticket[] = [this.ticket];
visibility:boolean = true;
globalTimeFormat:boolean = false;
globalTimeFormat2:boolean = false;
globalTopic:boolean = false;
globalZoomUrl:boolean = false;
globalTimeStampOrder:boolean = false;
success:string ="Ticket submitted successfully";
error:string ="Could not submit ticket"
action:string = "close";

public get topicCountGetter() {
  return this._topicCount;
}
/*Setter sets topic count.*/
public set topicCount(count:number) {
  this._topicCount = count;
}

public get returnTicketGetter() {
  return this._returnTickets;
}

  constructor(private ticketService:TicketService, private authService:AuthService,private _snackBar: MatSnackBar, private router: Router) { }


  ngOnInit(): void {
    this.authService.User.subscribe(user1 => {
      this.user = user1;
    });
    this.ticket.issuerID = this.user.uid;

  }

//This happens when we delede 
  onDeleteTopicClick() {
    for(let ticket of this.tickets){
      this.timeStampFormatValidator(ticket.startTime);
      this.timeStampFormatValidator2(ticket.endTime);
      this.topicValidator(ticket.topic);
      this.timeStampOrderValidator(ticket.startTime, ticket.endTime);
      if(!this.globalTimeFormat || !this.globalTimeFormat2 || !this.globalTopic || !this.globalTimeStampOrder) break;
          }
  }
  
//Validate order of Starting and Ending time for each clip
  onStartEndTimeChange() {
    for(let ticket of this.tickets){
      this.timeStampOrderValidator(ticket.startTime, ticket.endTime);
      if(!this.globalTimeStampOrder) break;
          }
  }

  //Validate zoom URL input
  zoomUrlValidator():void {
    let regexp = new RegExp('https?://(www.)?revature.zoom.us/rec/share/([-a-zA-Z0-9()@:%_+.~#?&//=]*)');
    if(regexp.test(this._zoomURL)) {this.globalZoomUrl = true}
    else this.globalZoomUrl = false;
  }


// Validate format of Starting time
  timeStampFormatValidator(time:string):void {
    let regexp = new RegExp('[0-9]{2}:[0-5]{1}[0-9]{1}:[0-5]{1}[0-9]{1}');
    //check if both timestamps are valid
    if(regexp.test(time)){ this.globalTimeFormat = true}
    else this.globalTimeFormat = false;
  }

  // Validate format of Ending time
  timeStampFormatValidator2(time:string):void {
    let regexp = new RegExp('[0-9]{2}:[0-5]{1}[0-9]{1}:[0-5]{1}[0-9]{1}');
    //check if both timestamps are valid
    if(regexp.test(time)){ this.globalTimeFormat2 = true}
    else this.globalTimeFormat2 = false;
  }

  //Making sure that Ending time is going after Starting time
  timeStampOrderValidator(startTime:string, endTime:string):void {
    //parse the timestamp into numbers
    let x:number = parseInt(startTime.replace(":","").replace(":",""));
    let y:number = parseInt(endTime.replace(":","").replace(":",""));

    //check if the starting time is earlier 
    if(x > y) {
      this.globalTimeStampOrder = false;
      }
    //return a true value
    else {
      this.globalTimeStampOrder = true;
      }
  }

  //Validate topic input
  topicValidator(topic:string):boolean {

    //check if both timestamps are valid
    if(topic.length>3){ 
      this.globalTopic = true;
      return true;
    }
    else {
      this.globalTopic = false;
      return false;
    }
  }

  //Count quantity of clips
  topicCountIncrementor() {
    if (this.topicCountValidator()) {
      this.tickets.push(new Ticket(0,this.user.uid,'0',new Date(),new Date(),"","","","",this._zoomURL,this.passcode,0,"pending",this.identifier,"",""))
      this._topicCount++;
   } else {
      this.visibility = false;
    }

  }
  topicCountDecrementor() {
    this._topicCount--;
  }

  //Set limit of clips
  topicCountValidator():boolean{
    if(this._topicCount > 30) return false;
    else return true;
  }

  //Make sure that each clip got last entered link , passcode and batch
  checkLink(){
    this.tickets.forEach(tkt => {
      tkt.zoomLink = this._zoomURL;
    });
  }
  checkPasscode(){
    this.tickets.forEach(tkt => {
      tkt.zoomPasscode = this.passcode;
    });
  }
  checkBatch(){
    this.tickets.forEach(tkt => {
      tkt.identifier = this.identifier;
    });
  }

  // Submit ticket button
  submitTickets() {
    this.checkLink();
    this.checkPasscode();
    this.checkBatch();

    this.ticketService.submitTickets(this.tickets).subscribe(
      (data) => {
        this.tickets = data;
        //display message and redirect to main page
        this.openSnackBar(this.success,this.action);
        this.router.navigate(['']);
       
      },
      () => {
        //display an error message
        this.openSnackBar(this.success,this.action);
       
      }
    )
  }

  //button for delete individual clip
  deleteTopic(ticket:Ticket) {
    if(this.tickets.includes(ticket)) {
      const index = this.tickets.indexOf(ticket, 0);
      if (index > -1) {
      this.tickets.splice(index, 1);
      //hide a limit warning
      this.visibility=true;
  }

    }
  }
// Pop up message 
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

}



import { Component, Directive, Input, OnInit } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn, Validators } from '@angular/forms';
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

ticket:Ticket  = new Ticket(0,'0','0',new Date(),new Date(),"","","","",this._zoomURL,this.passcode,0,"pending",this.identifier,"","");
tickets:Ticket[] = [this.ticket];
visibility:boolean = true;
submitted:boolean = true;
 

public get topicCountGetter() {
  return this._topicCount;
}

public set topicCount(count:number) {
  this._topicCount = count;
}

// public get returnTicketGetter() {
//   return this._returnTickets;
// }

  constructor(private ticketService:TicketService, private authService:AuthService) { }


  ngOnInit(): void {
    this.authService.User.subscribe(user1 => {
      this.user = user1;
    });
    this.ticket.issuerID = this.user.uid;
    console.log(this.user.displayName);

  }

  onZoomUrlWritten(event:any):boolean{
    console.log(event);
    return this.zoomUrlValidator(event.target);
  }


  zoomUrlValidator(zoomUrl:string):boolean {
    return zoomUrl.startsWith('https://revature.zoom.us/rec/share');
  }

  timeStampFormatValidator(startTime:string, endTime:string):boolean {
    let regexp = new RegExp('[0-9]{2}:[0-5]{1}[0-9]{1}:[0-5]{1}[0-9]{1}');
    //check if both timestamps are valid
    if(!(regexp.test(startTime) && regexp.test(endTime))) return false;
    else return true;
  }

  timeStampOrderValidator(startTime:string, endTime:string):boolean {
    //parse the timestamp into numbers
    let x:number = parseInt(startTime.replace(":","").replace(":",""));
    let y:number = parseInt(endTime.replace(":","").replace(":",""));

    //check if the starting time is earlier 
    if(x > y) return false;
    //return a true value
    else return true;
  }

  topicCountIncrementor() {
    if (this.topicCountValidator()) {
      this.tickets.push(new Ticket(0,this.user.uid,'0',new Date(),new Date(),"","","","",this._zoomURL,this.passcode,0,"pending",this.identifier,"",""))
      this._topicCount++;
   } else {
      this.visibility = false;
    }
  }

  topicCountValidator():boolean{
    if(this._topicCount > 30) return false;
    else return true;
  }

  topicCountDecrementor() {
    this._topicCount--;
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

  submitTickets() {
    this.checkLink();
    this.checkPasscode();
    this.checkBatch();

  
    this.ticketService.submitTickets(this.tickets).subscribe(
      (data) => {
        this.tickets = data;
        console.log('Successfully submitted tickets.');
        //refresh page after succsess
        this.submitted = false;
        window.location.reload(),5000;
      },
      () => {
        console.log('Failure in submitting tickets.');
      }
    )
  }

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

}

@Directive({
  selector: '[appZoomUrlValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: ZoomUrlValidatorDirective, multi: true}]
})
export class ZoomUrlValidatorDirective implements Validator {
  @Input('appZoomUrlValidator') validatedUrl!: string;
  zoomUrlValidator(zoomUrl:string):boolean {
    return zoomUrl.startsWith('https://revature.zoom.us/rec/share');
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return !this.validatedUrl ? this.urlValidator(this.validatedUrl)(control): null;
  }

  urlValidator(url:string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const allowedUrl:boolean = control.value.startsWith(url);
    return !allowedUrl ? {forbiddenName: {value: control.value}} : null;
  };
}
}

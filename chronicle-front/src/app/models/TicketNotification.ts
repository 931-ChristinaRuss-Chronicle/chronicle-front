import { Ticket } from "./Ticket";

export class TicketNotification{
    id:number;
    senderid:string;
    recieverid:string;
    ticketid:Ticket;
    senddate:Date;
    note:string;

    constructor(
    id:number,
    senderid:string,
    recieverid:string,
    ticketid:Ticket,
    senddate:Date,
    note:string
    ){
        this.id=id;
        this.senderid = senderid;
        this.recieverid = recieverid;
        this.ticketid = ticketid;
        this.senddate = senddate;
        this.note = note;
    }

}
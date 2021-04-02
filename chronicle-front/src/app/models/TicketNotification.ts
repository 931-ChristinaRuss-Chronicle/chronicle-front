import { Ticket } from "./Ticket";

export class TicketNotification{
    id:number;
    senderId:string;
    receiverId:string;
    ticket:Ticket;
    senddate:Date;
    note:string;

    constructor(
    id:number,
    senderId:string,
    receiverId:string,
    ticket:Ticket,
    senddate:Date,
    note:string
    ){
        this.id=id;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.ticket = ticket;
        this.senddate = senddate;
        this.note = note;
    }

}
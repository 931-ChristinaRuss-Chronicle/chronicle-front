export class Ticket{
    ticketID: number;
    issuerID: string;
    editorID: string;
    dateIssued:Date;
    dateAccepted:Date;
    topic:string;
    description:string;
    startTime: string;
    endTime:string;
    zoomLink:string;
    zoomPasscode:string;
    clipID: number;
    ticketStatus:string;
    identifier:string;
    clipUrl:string;
    rejectComment:string;

    constructor(ticketID: number,
        issuerID: string,
        editorID: string,
        dateIssued:Date,
        dateAccepted:Date,
        topic:string,
        description:string,
        startTime: string,
        endTime:string,
        zoomLink:string,
        zoomPasscode:string,
        clipID: number,
        ticketStatus:string,
        identifier:string,
        clipUrl:string,
        rejectComment:string
        )   {
            this.ticketID = ticketID;
            this.issuerID = issuerID;
            this.editorID = editorID;
            this.dateAccepted = dateAccepted;
            this.dateIssued = dateIssued;
            this.topic = topic;
            this.description = description;
            this.startTime = startTime;
            this.endTime = endTime;
            this.zoomLink = zoomLink;
            this.zoomPasscode = zoomPasscode;
            this.clipID = clipID;
            this.ticketStatus = ticketStatus;
            this.identifier = identifier;
            this.clipUrl =clipUrl;
            this.rejectComment = rejectComment
        }
}

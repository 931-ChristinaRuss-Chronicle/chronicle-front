export class Ticket{
    ticketID: number;
    issuerID: number;
    editorID: number;
    topic:String;
    description:String;
    startTime: String;
    endTime:String;
    zoomlink:String;
    zoompasscode:String;
    clipID: number;
    ticketStatus:String;
    identifier:String;
    clipUrl:String;
    rejectComment:String;

    constructor(ticketID: number,
        issuerID: number,
        editorID: number,
        topic:String,
        description:String,
        startTime: String,
        endTime:String,
        zoomlink:String,
        zoompasscode:String,
        clipID: number,
        ticketStatus:String,
        identifier:String,
        clipUrl:String,
        rejectComment:String
        )   {
            this.ticketID = ticketID;
            this.issuerID = issuerID;
            this.editorID = editorID;
            this.topic = topic;
            this.description = description;
            this.startTime = startTime;
            this.endTime = endTime;
            this.zoomlink = zoomlink;
            this.zoompasscode = zoompasscode;
            this.clipID = clipID;
            this.ticketStatus = ticketStatus;
            this.identifier = identifier;
            this.clipUrl =clipUrl;
            this.rejectComment = rejectComment
        }
}
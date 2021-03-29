import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Ticket } from 'src/app/models/Ticket';
import { TicketService } from 'src/app/services/ticket.service';

import { TicketApprovalComponent } from './ticket-approval.component';

export class MockTicketService extends TicketService{
  findUnderReviewTickets():Observable<Ticket[]>
  {
    let mockTickets:Observable<Ticket[]> = of([new Ticket(1,'1','100',"java primitives", "1 of 10", "00:45:56", "00:55:56","https://123", "11331345", 234, "under review", "CR 2/26/2021", "",""),
    new Ticket(3,'5','100',"java interface", "3 of 10", "01:05:56", "01:20:56","https://123", "11331345", 234, "under review", "CR 2/26/2021", "",""),
    new Ticket(3,'5','100',"java class", "4 of 10", "01:45:56", "01:55:56","https://123", "11331345", 234, "under review", "CR 2/26/2021", "","")]);
    return mockTickets;
  }

  findAllSubmittedTickets():Observable<Ticket[]>
  {
    let mockTickets:Observable<Ticket[]> = of([new Ticket(1,'1','100',"java primitives", "1 of 10", "00:45:56", "00:55:56","https://123", "11331345", 234, "under review", "CR 2/26/2021", "",""),
    new Ticket(3,'5','100',"java interface", "3 of 10", "01:05:56", "01:20:56","https://123", "11331345", 234, "under review", "CR 2/26/2021", "",""),
    new Ticket(3,'5','100',"java class", "4 of 10", "01:45:56", "01:55:56","https://123", "11331345", 234, "under review", "CR 2/26/2021", "","")]);
    return mockTickets;
  }

  updateTicketStatus(ticket:Ticket):Observable<Ticket>{

    let mockTicket:Observable<Ticket> = of (new Ticket(1,'1','100',"java primitives", "1 of 10", "00:45:56", "00:55:56","https://123", "11331345", 234, "ACKNOWLEDGED", "CR 2/26/2021", "","")
    )
    
    return mockTicket;
  }

}


describe('TicketApprovalComponent', () => {
  let component: TicketApprovalComponent;
  let fixture: ComponentFixture<TicketApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketApprovalComponent ],
      imports:[HttpClientTestingModule],
      providers:[{provide: TicketService, useClass:MockTicketService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all under review tickets', () =>{
    component.findUnderReviewTickets();
    expect(component.underReviewTickets.length).toEqual(3);
  });

  it('should display all other tickets that the user submited', () =>{
    expect(component.allSubmittedTickets.length).toEqual(0);
    component.findAllSubmittedTickets();
    expect(component.allSubmittedTickets.length).toEqual(3);
  })

  it('should change the status of a ticket to approved', () =>{
    let testTicket:Ticket = new Ticket(3,'5','100',"java class", "4 of 10", "01:45:56", "01:55:56","https://123", "11331345", 234, "PENDING", "CR 2/26/2021", "","");
    component.approveTicket(testTicket);
    expect(component.tempTicket.ticketStatus).toEqual("APPROVED");
  })

  it('should change the status of a ticket to in_progress', () =>{
    let testTicket:Ticket = new Ticket(3,'5','100',"java class", "4 of 10", "01:45:56", "01:55:56","https://123", "11331345", 234, "PENDING", "CR 2/26/2021", "","");
    component.rejectTicket(testTicket,"bad clip");
    expect(component.tempTicket.ticketStatus).toEqual("IN_PROGRESS");
    expect(component.rejectComment).toEqual("bad clip");
  })
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { Ticket } from 'src/app/models/Ticket';
import { TicketService } from 'src/app/services/ticket.service';
import { environment } from 'src/environments/environment';

import { TicketViewComponent } from './ticket-view.component';

export class MockTicketService extends TicketService{
  findAllPendingTickets():Observable<Ticket[]>
  {
    let mockTickets:Observable<Ticket[]> = of([
      new Ticket(1,'1','100',new Date(),new Date(),"java primitives", "1 of 10", "00:45:56", "00:55:56","https://123", "11331345", 234, "PENDING", "CR 2/26/2021", "",""),
      new Ticket(3,'5','100',new Date(),new Date(),"java interface", "3 of 10", "01:05:56", "01:20:56","https://123", "11331345", 234, "PENDING", "CR 2/26/2021", "",""),
      new Ticket(3,'5','100',new Date(),new Date(),"java class", "4 of 10", "01:45:56", "01:55:56","https://123", "11331345", 234, "PENDING", "CR 2/26/2021", "","")
    ]);
    return mockTickets;
  }

  findAllTicketsByEditor(){
    let mockTickets:Observable<Ticket[]> = of([
      new Ticket(1,'1','100',new Date(),new Date(),"java primitives", "1 of 10", "00:45:56", "00:55:56","https://123", "11331345", 234, "ACKNOWLEDGED", "CR 2/26/2021", "",""),
      new Ticket(3,'5','100',new Date(),new Date(),"java interface", "3 of 10", "01:05:56", "01:20:56","https://123", "11331345", 234, "ACKNOWLEDGED", "CR 2/26/2021", "","")
    ])
    return mockTickets;
  }

  updateTicketStatus(ticket:Ticket):Observable<Ticket>{

    let mockTicket:Observable<Ticket> = of (new Ticket(1,'1','100',new Date(),new Date(),"java primitives", "1 of 10", "00:45:56", "00:55:56","https://123", "11331345", 234, "ACKNOWLEDGED", "CR 2/26/2021", "","")
    )
    
    return mockTicket;
  }
}

describe('TicketViewComponent', () => {
  let component: TicketViewComponent;
  let fixture: ComponentFixture<TicketViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketViewComponent ],
      imports:[HttpClientTestingModule, RouterTestingModule, AngularFireModule.initializeApp(environment.firebaseConfig)],
      providers:[{provide: TicketService, useClass:MockTicketService
        }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find PENDING tickets', () =>{
    component.findAllPendingTickets();
    expect(component.allPendingTickets.length).toEqual(3);

  });

  it('should find all my tickets', () =>{
    component.findAllMyTickets();
    expect(component.allMyTickets.length).toEqual(2);
    expect(component.allMyTickets[0].ticketStatus).toEqual("ACKNOWLEDGED")

  });

  //not sure it it is possible
  //it('should acquire a list of videos uploaded by that user')


  it('should change the status of a ticket to ACKNOWLEDGED', () =>{
    let testTicket:Ticket = new Ticket(3,'5','100',new Date(),new Date(),"java class", "4 of 10", "01:45:56", "01:55:56","https://123", "11331345", 234, "PENDING", "CR 2/26/2021", "","")
    component.updateTicketStatusToAcknowledged(testTicket)

    expect(component.tempTicket.ticketStatus).toEqual("ACKNOWLEDGED")
  });

  it('should change the status of a ticket to IN_PROGRESS', () =>{
    let testTicket:Ticket = new Ticket(3,'5','100',new Date(),new Date(),"java class", "4 of 10", "01:45:56", "01:55:56","https://123", "11331345", 234, "PENDING", "CR 2/26/2021", "","")
    component.updateTicketStatusToInProgress(testTicket)

    expect(component.tempTicket.ticketStatus).toEqual("IN_PROGRESS")
  });

  it('should change the status of a ticket to UNDER_REVIEW', () =>{
    let testTicket:Ticket = new Ticket(3,'5','100',new Date(),new Date(),"java class", "4 of 10", "01:45:56", "01:55:56","https://123", "11331345", 234, "IN_PROGRESS", "CR 2/26/2021", "","")
    component.updateTicketStatusToUnderReview(testTicket)

    expect(component.tempTicket.ticketStatus).toEqual("UNDER_REVIEW")
  });


});

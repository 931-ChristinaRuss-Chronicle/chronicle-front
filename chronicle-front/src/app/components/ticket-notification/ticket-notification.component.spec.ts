import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Ticket } from 'src/app/models/Ticket';
import { TicketNotification } from 'src/app/models/TicketNotification';
import { NotificationService } from 'src/app/services/notification.service';

import { TicketNotificationComponent } from './ticket-notification.component';

export class MockNotificationService extends NotificationService{


  findAllByReciever():Observable<TicketNotification[]>{
    let mockTicket = new Ticket(1,'1','100',new Date(),new Date(),"java primitives", "1 of 10", "00:45:56", "00:55:56","https://123", "11331345", 234, "ACKNOWLEDGED", "CR 2/26/2021", "","");
    let mockNotifications:Observable<TicketNotification[]> = of ([new TicketNotification(1,'1','2', mockTicket, new Date(0), 'note'),
    new TicketNotification(1,'2','3', mockTicket, new Date(0), 'demo'),
    new TicketNotification(1,'3','4', mockTicket, new Date(0), 'test')]) ;
    return mockNotifications;
  }

}


describe('TicketNotificationComponent', () => {
  let component: TicketNotificationComponent;
  let fixture: ComponentFixture<TicketNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketNotificationComponent ],
      imports:[HttpClientTestingModule],
      providers:[{provide:NotificationService,useClass:MockNotificationService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should find all tickets by reciever', ()=>{
    expect(component.notifications.length).toEqual(0);
    component.findAllByReciever();
    expect(component.notifications.length).toEqual(3);
  })

});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Ticket } from 'src/app/models/Ticket';
import { TicketService } from 'src/app/services/ticket.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TicketAddComponent } from './ticket-add.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';


export class MockTicketService extends TicketService{
  submitTickets(tickets:Ticket[]):Observable<Ticket[]>{
    let mockTickets:Observable<Ticket[]> = of([
      new Ticket(1,'1','100',new Date(),new Date(),"java primitives", "1 of 10", "00:45:56", "00:55:56","https://123", "11331345", 234, "ACKNOWLEDGED", "CR 2/26/2021", "",""),
      new Ticket(3,'5','100',new Date(),new Date(),"java interface", "3 of 10", "01:05:56", "01:20:56","https://123", "11331345", 234, "ACKNOWLEDGED", "CR 2/26/2021", "","")
    
    ])
    return mockTickets;
  }
  
}

describe('TicketAddComponent', () => {
  let component: TicketAddComponent;
  let fixture: ComponentFixture<TicketAddComponent>;

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      declarations: [ TicketAddComponent ],
      imports:[HttpClientTestingModule, RouterTestingModule, AngularFireModule.initializeApp(environment.firebaseConfig), MatSnackBarModule],
      providers:[{provide: TicketService, useClass:MockTicketService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate Zoom URL', () => {
    component._zoomURL = 'https://revature.zoom.us/rec/share/thdhdehdethyjyj';
    component.zoomUrlValidator();
    expect(component.globalZoomUrl).toBeTruthy();
  });

  it('should validate time stamps by order', () => {
    let startTimeTest:string = '00:44:00';
    let endTimeTest:string = '00:45:00';
    expect(component.timeStampOrderValidator(startTimeTest,endTimeTest)).toBeTruthy();
  });

  it('should validate time stamps by format', () => {
    let startTimeTest:string = '99:54:99';
    let endTimeTest:string = '00:06:43';
    expect(component.timeStampFormatValidator(startTimeTest)).toBeFalsy();
  });

  it('should increment row count through add more button click', () => {
    component.topicCount = 10;
    component.topicCountIncrementor();
    expect(component.topicCountGetter).toEqual(11);
  });

  it('should validate the row count to reach a limit', () => {
    component.topicCount = 10;
    component.topicCountIncrementor();
    expect(component.topicCountValidator()).toBeFalsy();
  });

  it('should decrease row count through delete button click', () => {
    component.topicCount = 10;
    component.topicCountDecrementor();
    expect(component.topicCountGetter).toEqual(9);
  });

  it('should call ticket service upon submit button click', () => {
    component.submitTickets();
    expect(component.returnTicketGetter.length).toEqual(2);
  });

});

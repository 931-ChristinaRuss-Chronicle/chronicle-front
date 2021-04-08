import { ComponentFixture, fakeAsync, inject, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
            RouterTestingModule,
            
            AngularFireModule.initializeApp(environment.firebaseConfig)

          ],
      declarations: [ LoginComponent ],
      providers: [AuthService, AngularFireAuth]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //disabled
  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  //disabled
  xit('should render firebase-ui login form', () => {
    const firebaseUi = fixture.debugElement.nativeElement.querySelector('firebase-ui');
    expect(firebaseUi).toBeDefined();
  });

});

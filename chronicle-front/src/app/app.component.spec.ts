import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';

import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { LoginComponent } from './components/login/login.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        // AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
      declarations: [
        AppComponent,
        LoginComponent
      ],
    }).compileComponents();
  });

  //disabled
  xit('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  //disabled
  xit(`should have as title 'chronicle-front'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('chronicle-front');
  });

  //disabled
  xit('should render login component', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const login = fixture.componentInstance;
    expect(login).toBeTruthy();
  });
});

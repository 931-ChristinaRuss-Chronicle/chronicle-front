import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { UploadpageComponent } from './uploadpage.component';

describe('UploadpageComponent', () => {
  let component: UploadpageComponent;
  let fixture: ComponentFixture<UploadpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
            RouterTestingModule,
            HttpClientModule,
            AngularFireModule.initializeApp(environment.firebaseConfig),
            MatSnackBarModule
        ],
      declarations: [ UploadpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //disabled
  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});

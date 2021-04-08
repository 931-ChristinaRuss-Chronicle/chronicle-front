import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { TokenInterceptorService } from './token-interceptor.service';

describe('TokenInterceptorService', () => {
  let service: TokenInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule,
      ],
      providers: [TokenInterceptorService, AngularFireModule, RouterTestingModule]
    });
    service = TestBed.inject(TokenInterceptorService);
  });

  //disabled
  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});

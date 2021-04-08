import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire';

import { ResponseInterceptorService } from './response-interceptor.service';
import { environment } from 'src/environments/environment';

describe('ResponseInterceptorService', () => {
  let service: ResponseInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, AngularFireModule, AngularFireModule.initializeApp(environment.firebaseConfig)],
      providers: [AngularFireModule]
    });
    service = TestBed.inject(ResponseInterceptorService);
  });

  //disabled
  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});

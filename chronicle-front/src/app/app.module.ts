import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
// import { SatDatepickerModule, SatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from 'saturn-datepicker';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { VideopageComponent } from './components/videopage/videopage.component';
import { NotespageComponent } from './components/notespage/notespage.component';
import { MediaRetrievalService } from './services/media-retrieval.service';
import { VideoPanelComponent } from './components/panels/video-panel/video-panel.component';
import { NotePanelComponent } from './components/panels/note-panel/note-panel.component';
import { ViewvideopageComponent } from './components/viewvideopage/viewvideopage.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { VjsPlayerComponent } from './components/vjsplayer/vjsplayer.component';

import { FirebaseUIModule, firebase, firebaseui } from 'firebaseui-angular';
import { environment } from '../environments/environment';


import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AttributionComponent } from './components/attribution/attribution.component';
import { UploadpageComponent } from './components/uploadpage/uploadpage.component';
import { UploadService } from './services/upload.service';
import { ViewnotepageComponent } from './components/viewnotepage/viewnotepage.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { FilterComponent } from './components/filter/filter.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ResponseInterceptorService } from './services/response-interceptor.service';
import { WhitelistSelectComponent } from './components/whitelist-select/whitelist-select.component';

import {MatCheckboxModule} from '@angular/material/checkbox';
import { EditWhitelistComponent } from './components/edit-whitelist/edit-whitelist.component';
import { TicketAddComponent } from './components/ticket-add/ticket-add.component';
import { TicketViewComponent } from './components/ticket-view/ticket-view.component';
import { TicketApprovalComponent } from './components/ticket-approval/ticket-approval.component';
import { TicketNotificationComponent } from './components/ticket-notification/ticket-notification.component';





/**
 * This renders the firebaseUI based on configuration.
 * Currently only set for email authentication.
 * Refer to firebaseUI documentation on how to display other forms of auth
 *
 * */
const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',

  signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  tosUrl: 'https://revature.com/',
  privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    NavbarComponent,
    VideopageComponent,
    NotespageComponent,
    VideoPanelComponent,
    NotePanelComponent,
    ViewvideopageComponent,
    ViewnotepageComponent,
    SearchbarComponent,
    VjsPlayerComponent,
    FilterComponent,
    AttributionComponent,
    UploadpageComponent,
    WhitelistSelectComponent,
    EditWhitelistComponent,
    TicketAddComponent,
    TicketViewComponent,
    TicketApprovalComponent,
    TicketNotificationComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    MatChipsModule,
    MatFormFieldModule,
    MatGridListModule,
    MatAutocompleteModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatFileInputModule,
    NgxDocViewerModule,
    // SatDatepickerModule,
    // SatNativeDateModule
    MatDatepickerModule

  ],
  providers: [
    UploadService,
    MediaRetrievalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptorService,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})


export class AppModule {
  constructor(){
    firebase.initializeApp(environment.firebaseConfig);
  }
 }

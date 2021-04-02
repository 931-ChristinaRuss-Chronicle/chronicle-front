import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MediaRetrievalService } from 'src/app/services/media-retrieval.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: any;


  constructor(
    private authService: AuthService,
    private mediaRetrievalService: MediaRetrievalService,
    private aAuth: AngularFireAuth, 
    private userAuth: AuthService

  ) {

  }

  ngOnInit(): void {
    this.checkUserRole();
    this.authService.User.subscribe(user => {
      this.user = user
    });
  }
  // allows a user to logout
  onLogout(): void {

    this.authService.logout();
  }

  onClick(): void {
    this.mediaRetrievalService.selectedTags =[];
    this.mediaRetrievalService.selectedBatchTags =[];
    this.mediaRetrievalService.date = undefined;

  }
  isEditor: boolean = false;
  checkUserRole(){
    this.aAuth.idTokenResult.subscribe(resp => {
      if(resp?.claims.role && resp.claims.role.includes("ROLE_EDITOR")){
        this.isEditor = true;
      } else {
        this.isEditor =false;
      }
  })
}
}
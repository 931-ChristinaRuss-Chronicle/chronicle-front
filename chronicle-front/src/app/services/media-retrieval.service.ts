import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { concatMap, map, switchMap, take } from 'rxjs/operators';
import { Note } from '../models/Note';
import { Tag } from '../models/Tag';
import { Video } from '../models/Video';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Ticket } from '../models/Ticket';

@Injectable({
  providedIn: 'root'
})
export class MediaRetrievalService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  selectedTags: Tag[] = [];
  selectedBatchTags: Tag[] =[];
  allTags: Tag[] =[];
  date?: string;


  // ====== Utility ============

  // Sets authentication headers
  // async setHeaders() {
  //   const authToken = await this.authService.getSyncToken();
  //   this.requestHeaders = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${authToken}`
  //   })
  // }


  public searchVideoTag(tag : Tag){
    if (tag.type == "Topic") {
    this.selectedTags = [tag];
    this.router.navigateByUrl('/videos');
    }
  }

  public searchNoteTag(tag : Tag){
    if (tag.type == "Topic") {
    this.selectedTags = [tag];
    this.router.navigateByUrl('/notes');
    }
  }


  // Retrieves all tags from the db and maps them to a Tag model
  // Utility function to filter tags by their 'name'
  public filterTags(allTags: Tag[], tagName: string): Tag[] {
    console.log(allTags);

    return allTags.filter(tag => tag.type == tagName);
  }

 public formatDate(input: string){
   let split = input.split("T");
  return split[0];
 }

  public getAllTags() : Observable<Tag[]>{
    // this.setHeaders();
    return this.httpClient.get(environment.apiBase + environment.serverApiUrls.getTags)
    .pipe(map((resp:any) => {
      return resp.map((tag:any) => {
        let newTag: Tag = {
          tagID: tag.tagID,
          type: tag.type,
          value: tag.value
        };

        return newTag;
      })
    }));
  }


//============ Notes ===================

//Retrieves all notes from the DB and maps them to a Note model
  public getAllNotes() : Observable<Note[]> {
    // this.setHeaders();
    return this.httpClient.get(environment.apiBase + environment.serverApiUrls.getAllNotes)
    .pipe(map((resp:any) => {
      return resp.map((note:any) => {
        let newNote: Note = {
          id : note.id,
          description : note.description,
          title: note.title,
          date: this.formatDate(note.date),
          userId : note.user,
          displayName: note.displayName,
          url : note.url,
          tags : note.tags,
          private: note.private,
          whitelist: note.whitelist,
        };
        return newNote;
      })
    }));
  }

 //Retrieves Notes by tag(s) from DB and maps them to a Note model
  public getNotesByTag(tags: Tag[]) : Observable<Note[]> {
    let tagPath: string = "";
    tags.forEach(tag => {
      tagPath += `${tag.tagID}:${tag.type}:${tag.value}+`;
    });
    tagPath = tagPath.slice(0,-1);
    // this.setHeaders();
    return this.httpClient.get(environment.apiBase + environment.serverApiUrls.getNotesByTag + tagPath)
    .pipe(map((resp:any) => {
      return resp.map((note:any) => {
        let newNote: Note = {
          id : note.id,
          description : note.description,
          title: note.title,
          date: this.formatDate(note.date),
          userId : note.user,
          displayName: note.displayName,
          url : note.url,
          tags : note.tags,
          private: note.private,
          whitelist: note.whitelist,
        };
        return newNote;
      })
    }));
  }

  // Retrieves a note by ID and maps them to a Note model
  public getNoteById(id: number) : Observable<Note> {
    // this.setHeaders();
    return this.httpClient.get(environment.apiBase + environment.serverApiUrls.getNoteById + id)
    .pipe(map((note:any) => {
      let newNote: Note = {
        id : note.id,
        description : note.description,
        title: note.title,
        date: this.formatDate(note.date),
        userId : note.user,
        displayName: note.displayName,
        url : note.url,
        tags : note.tags,
          private: note.private,
          whitelist: note.whitelist,
      };
      return newNote;
    }));
  }

//================= Videos ================

// Retrieves all videos from the DB and maps them to a Video model
  public getAllVideos() : Observable<Video[]> {
    // this.setHeaders();
    return this.httpClient.get(environment.apiBase + environment.serverApiUrls.getAllVideos)
    .pipe(map((resp:any) => {
      return resp.map((video:any) => {
        let newVideo: Video = {
          id : video.id,
          description : video.description,
          title: video.title,
          date: this.formatDate(video.date),
          userId : video.user,
          displayName: video.displayName,
          url : video.url,
          tags : video.tags,
          private: video.private,
          whitelist: video.whitelist,
        };

        return newVideo;
      })
    }));
  }

  // Retrieves Videos by tag(s) from the DB and maps them to a Video model
  public getVideosByTag(tags: Tag[]) : Observable<Video[]> {
    let tagPath: string = "";
    tags.forEach(tag => {
      tagPath += `${tag.tagID}:${tag.type}:${tag.value}+`;
    });
    tagPath = tagPath.slice(0,-1);
    // this.setHeaders();
    return this.httpClient.get(environment.apiBase + environment.serverApiUrls.getVideosByTag + tagPath)
    .pipe(map((resp:any) => {
      return resp.map((video:any) => {
        let newVideo: Video = {
          id : video.id,
          description : video.description,
          title: video.title,
          date: this.formatDate(video.date),
          userId : video.user,
          displayName: video.displayName,
          url : video.url,
          tags : video.tags,
          private: video.private,
          whitelist: video.whitelist,
        };
        return newVideo;
      })
    }));
  }

  // Retrieves Video by ID from the DB and maps it to a Video model
  public getVideoById(id: number) : Observable<Video> {
    // this.setHeaders();

    return this.httpClient.get(environment.apiBase + environment.serverApiUrls.getVideoById + id)
    .pipe(map((video:any) => {
      let newVideo: Video = {
        id : video.id,
        description : video.description,
        title: video.title,
        date: this.formatDate(video.date),
        userId : video.user,
        displayName: video.displayName,
        url : video.url,
        tags : video.tags,
        private: video.private,
        whitelist: video.whitelist,
      };
      return newVideo;
    }));
  }


}

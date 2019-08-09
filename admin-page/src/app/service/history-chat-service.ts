import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Message} from 'ng-chat';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryChatService {

  constructor(private httpClient: HttpClient) {
  }

  messages: Message[] = [];

  history(fromUserId: string, toUserId: string) {

  }

}

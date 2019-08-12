import {Message, PagedHistoryChatAdapter, ParticipantResponse} from 'ng-chat';
import {Observable, of} from 'rxjs';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Injectable} from '@angular/core';
import {delay} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UsersService} from './users.service';
import {ChatEngineService} from './chat-engine.service';

@Injectable({
  providedIn: 'root'
})
export class ChatAdapterStomp extends PagedHistoryChatAdapter {

  messages: Message[] = [];

  constructor(private chatService: ChatEngineService, private userService: UsersService) {
    super();
  }

  listFriends(): Observable<ParticipantResponse[]> {
    return of(this.userService.users.map(user => {
      const participantResponse = new ParticipantResponse();

      participantResponse.participant = user;
      return participantResponse;
    }));
  }

  getMessageHistory(toUserId: any): Observable<Message[]> {
    return of([]);
  }

  sendMessage(message: Message): void {
    this.chatService.sendMessage(message);
  }

  getMessageHistoryByPage(toUserId: any, size: number, page: number): Observable<Message[]> {
    const historyMessages: Message[] = [];
    const admin = this.userService.admin;
    this.chatService.messageHistory(toUserId, admin.id).subscribe(resp => {
      this.messages = resp.body;
      for (const message of this.messages) {
        historyMessages.push(message);
      }
    }, error => {
      this.messages = [];
    });

    this.chatService.subscribeByUser(admin.id).subscribe(response => {
      const jsonObject: Message = JSON.parse(response.body);
      console.log('watch message', jsonObject);

      let userRecieved = this.userService.users.find(user => user.id === jsonObject.fromId);
      console.log('user received ', userRecieved);
      this.onMessageReceived(userRecieved, jsonObject);
    }, error => {
      console.log('error subscribe ', error);
    });

    console.log(`${toUserId} size ${size} page ${page}`, historyMessages);
    return of(historyMessages).pipe(delay(1000));
  }

}

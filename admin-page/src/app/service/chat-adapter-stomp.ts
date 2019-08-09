import {
  ChatAdapter,
  ChatParticipantStatus,
  ChatParticipantType,
  IChatParticipant,
  Message,
  PagedHistoryChatAdapter,
  ParticipantResponse
} from 'ng-chat';
import {observable, Observable, of, pipe} from 'rxjs';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Injectable} from '@angular/core';
import {HistoryChatService} from './history-chat-service';
import {delay} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatAdapterStomp extends PagedHistoryChatAdapter {

  messages: Message[] = [];

  constructor(private service: RxStompService, private httpClient: HttpClient) {
    super();
  }

  mockedParticipants: IChatParticipant[] = [
    {
      participantType: ChatParticipantType.User,
      id: 'c3ad0ffe-ba85-11e9-8337-0242ac130002',
      displayName: 'Muhamad Yusuf',
      avatar: null,
      status: ChatParticipantStatus.Online
    },
    {
      participantType: ChatParticipantType.User,
      id: 'c3ad112d-ba85-11e9-8337-0242ac130002',
      displayName: 'Abdul',
      avatar: null,
      status: ChatParticipantStatus.Online
    },
    {
      participantType: ChatParticipantType.User,
      id: 'c3ad1283-ba85-11e9-8337-0242ac130002',
      displayName: 'Haris',
      avatar: null,
      status: ChatParticipantStatus.Offline
    }];

  fromUserId = 'c3ad0c8e-ba85-11e9-8337-0242ac130002';

  listFriends(): Observable<ParticipantResponse[]> {
    return of(this.mockedParticipants.map(user => {
      const participantResponse = new ParticipantResponse();

      participantResponse.participant = user;
      return participantResponse;
    }));
  }

  getMessageHistory(toUserId: any): Observable<Message[]> {
    return of([]);
  }

  sendMessage(message: Message): void {
    console.log('message ', message);
    this.service.publish({destination: '/chat/private', body: JSON.stringify(message)});
  }

  getMessageHistoryByPage(toUserId: any, size: number, page: number): Observable<Message[]> {
    const historyMessages: Message[] = [];
    let params = new HttpParams();
    params = params.append('fromId', this.fromUserId);
    params = params.append('toId', toUserId);
    this.httpClient.get<Message[]>(`${environment.restApi}/message/history/byUser`, {
      params: params,
      observe: 'response'
    }).subscribe(resp => {
      this.messages = resp.body;
      for (const message of this.messages) {
        historyMessages.push(message);
      }
      console.log('response http ', historyMessages);
    }, error => {
      this.messages = [];
    });

    console.log(`${toUserId} size ${size} page ${page}`, historyMessages);
    return of(historyMessages).pipe(delay(5000));
  }

}

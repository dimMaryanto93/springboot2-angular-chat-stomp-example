import {ChatParticipantStatus, ChatParticipantType, Message, PagedHistoryChatAdapter, ParticipantResponse} from 'ng-chat';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {delay} from 'rxjs/operators';
import {UsersService} from './users.service';
import {ChatEngineService} from './chat-engine.service';
import {UsersModel} from '../model/users.model';
import {HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatAdapterStomp extends PagedHistoryChatAdapter {

  private messages: Message[] = [];
  private listFriendsUser: UsersModel[] = [];

  constructor(private userService: UsersService, private chatService: ChatEngineService) {
    super();
  }

  listFriends(): Observable<ParticipantResponse[]> {
    this.userService.listFriends().subscribe((resp: HttpResponse<UsersModel[]>) => {
      this.listFriendsUser = resp.body;
      const responses: ParticipantResponse[] = this.listFriendsUser.map(user => {
        const participantResponse = new ParticipantResponse();
        user.status = ChatParticipantStatus.Online;
        user.avatar = null;
        user.participantType = ChatParticipantType.User;
        participantResponse.participant = user;
        return participantResponse;
      });
      this.friendsListChangedHandler(responses);
    }, error => {
      this.listFriendsUser = [];
    });
    return of([]);
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
      console.log(this.messages);
      if (this.messages) {
        for (const message of this.messages) {
          historyMessages.push(message);
        }
      }
    }, error => {
      this.messages = [];
    });

    this.chatService.subscribeByUser(admin.id).subscribe(response => {
      const jsonObject: Message = JSON.parse(response.body);
      console.log('watch message', jsonObject);

      this.userService.findById(jsonObject.fromId).subscribe(resp => {
        let model: UsersModel = resp.body;
        model.participantType = ChatParticipantType.User;
        model.avatar = null;
        model.status = ChatParticipantStatus.Online;
        this.onMessageReceived(model, jsonObject);
      });
    }, error => {
      console.log('error subscribe ', error);
    });

    console.log(`${toUserId} size ${size} page ${page}`, historyMessages);
    return of(historyMessages).pipe(delay(1000));
  }

}

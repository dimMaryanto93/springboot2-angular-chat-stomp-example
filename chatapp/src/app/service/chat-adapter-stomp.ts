import {ChatAdapter, ChatParticipantStatus, ChatParticipantType, Group, IChatParticipant, Message, ParticipantResponse} from 'ng-chat';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {RxStompService} from '@stomp/ng2-stompjs';

export class ChatAdapterStomp extends ChatAdapter {

  constructor(private service: RxStompService) {
    super();
  }

  public static mockedParticipants: IChatParticipant[] = [
    {
      participantType: ChatParticipantType.User,
      id: '8e1cef4e-35b8-494f-84bf-c20f1a50b2b0',
      displayName: 'Arya Stark',
      avatar: 'https://66.media.tumblr.com/avatar_9dd9bb497b75_128.pnj',
      status: ChatParticipantStatus.Online
    },
    {
      participantType: ChatParticipantType.User,
      id: 'bd92c540-806e-433c-9e6b-4dd386b1c67f',
      displayName: 'Cersei Lannister',
      avatar: null,
      status: ChatParticipantStatus.Online
    },
    {
      participantType: ChatParticipantType.User,
      id: 'd8b90a6d-2f90-42ef-9770-52d4331b1699',
      displayName: 'Daenerys Targaryen',
      avatar: 'https://68.media.tumblr.com/avatar_d28d7149f567_128.png',
      status: ChatParticipantStatus.Busy
    }];

  listFriends(): Observable<ParticipantResponse[]> {
    return of(ChatAdapterStomp.mockedParticipants.map(user => {
      const participantResponse = new ParticipantResponse();

      participantResponse.participant = user;
      participantResponse.metadata = {
        totalUnreadMessages: Math.floor(Math.random() * 10)
      };

      return participantResponse;
    }));
  }

  getMessageHistory(destinataryId: any): Observable<Message[]> {
    let mockedHistory: Array<Message>;

    mockedHistory = [
      {
        fromId: 'bd92c540-806e-433c-9e6b-4dd386b1c67f',
        toId: 'bd92c540-806e-433c-9e6b-4dd386b1c67f',
        message: 'Hi there, just type any message bellow',
        dateSent: new Date()
      }
    ];

    return of(mockedHistory).pipe(delay(2000));
  }

  sendMessage(message: Message): void {
    setTimeout(() => {
      const replyMessage = new Message();

      replyMessage.message = 'You have typed \'' + message.message + '\'';
      replyMessage.dateSent = new Date();

      if (isNaN(message.toId)) {
        console.log('message to ' + message.toId);

        const group = ChatAdapterStomp.mockedParticipants.find(x => x.id === message.toId) as Group;
        replyMessage.fromId = 'd8b90a6d-2f90-42ef-9770-52d4331b1699';

        replyMessage.toId = message.toId;

        this.onMessageReceived(group, replyMessage);
      } else {
        replyMessage.fromId = message.toId;
        replyMessage.toId = message.fromId;

        const user = ChatAdapterStomp.mockedParticipants.find(x => x.id === replyMessage.fromId);

        console.log('message ' + message.message);
        this.onMessageReceived(user, replyMessage);
      }
    }, 1000);
  }

}

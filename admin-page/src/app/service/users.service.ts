import {Injectable} from '@angular/core';
import {ChatParticipantStatus, ChatParticipantType, IChatParticipant} from 'ng-chat';

@Injectable({providedIn: 'root'})
export class UsersService {
  public users: IChatParticipant[] = [
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

  public admin: IChatParticipant = {
    participantType: ChatParticipantType.User,
    id: 'c3ad0c8e-ba85-11e9-8337-0242ac130002',
    displayName: 'Admin',
    avatar: null,
    status: ChatParticipantStatus.Online
  };

}

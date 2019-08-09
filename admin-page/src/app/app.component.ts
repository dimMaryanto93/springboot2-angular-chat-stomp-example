import {Component, OnInit, ViewChild} from '@angular/core';
import {ChatAdapter, IChatController, IChatParticipant, PagedHistoryChatAdapter} from 'ng-chat';
import {ChatAdapterStomp} from './service/chat-adapter-stomp';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Chat App';
  userId = 'c3ad0c8e-ba85-11e9-8337-0242ac130002';
  adapter: PagedHistoryChatAdapter;
  triggeredEvents = [];

  @ViewChild('ngChatInstance', {static: false})
  protected ngChatInstance: IChatController;

  constructor(adapter: ChatAdapterStomp) {
    this.adapter = adapter;
  }

  ngOnInit(): void {

  }

  onEventTriggered(event: string): void {
    this.triggeredEvents.push(event);
  }

  onMessageOpened(event: IChatParticipant) {
    console.log(event);
  }
}

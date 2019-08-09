import {Component, OnInit} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {FormBuilder} from '@angular/forms';
import {ChatAdapter} from 'ng-chat';
import {ChatAdapterStomp} from './service/chat-adapter-stomp';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Chat App';
  userId = '8e1cef4e-35b8-494f-84bf-c20f1a50b2b0';
  adapter: ChatAdapter;
  triggeredEvents = [];

  constructor(
    private messageService: RxStompService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.adapter = new ChatAdapterStomp(this.messageService);
  }

  onEventTriggered(event: string): void {
    this.triggeredEvents.push(event);
  }
}

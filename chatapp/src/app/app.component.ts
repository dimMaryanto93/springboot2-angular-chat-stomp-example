import {Component, OnInit} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Message} from '@stomp/stompjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Chat App';
  formGroup: FormGroup;

  constructor(
    private messageService: RxStompService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      message: this.formBuilder.control(''),
      from: this.formBuilder.control(Math.random().toString())
    });
    // tslint:disable-next-line:no-shadowed-variable
    this.messageService.watch('/chat/send').subscribe((message: Message) => {
      console.log(message);
    });
  }

  sendMessage($event: any) {
    this.messageService.publish({
      destination: '/chat/private',
      body: JSON.stringify(this.formGroup.value),
      retryIfDisconnected: true,
      skipContentLengthHeader: true
    });
  }
}

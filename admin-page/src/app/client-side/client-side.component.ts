import {Component, OnInit} from '@angular/core';
import {UsersService} from '../service/users.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChatEngineService} from '../service/chat-engine.service';
import {Message} from 'ng-chat';

@Component({
  selector: 'app-client-side',
  templateUrl: './client-side.component.html',
  styleUrls: ['./client-side.component.css']
})
export class ClientSideComponent implements OnInit {

  formGroup: FormGroup;
  historyMessage: Message[] = [];

  constructor(private userService: UsersService, private formBuilder: FormBuilder, private chatService: ChatEngineService) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      toId: this.formBuilder.control(this.userService.admin.id),
      fromId: this.formBuilder.control('', [Validators.required]),
      message: this.formBuilder.control('')
    });
    this.chatService.subscribeByUser(this.userService.users[0].id).subscribe(response => {
      const message: Message = JSON.parse(response.body);
      this.historyMessage.push(message);
    });
  }

  sendMessage($event: Event) {
    const message: Message = this.formGroup.value;
    console.log('value form ', message);
    this.chatService.sendMessage(message);
    this.formGroup.reset();
    this.formGroup.patchValue({
      toId: this.userService.admin.id
    });
  }
}

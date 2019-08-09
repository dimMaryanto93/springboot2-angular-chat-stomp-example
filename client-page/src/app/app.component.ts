import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userId = 'c3ad0c8e-ba85-11e9-8337-0242ac130002';
  tittle = 'Chat client';

  constructor() {
  }

  ngOnInit(): void {

  }
}

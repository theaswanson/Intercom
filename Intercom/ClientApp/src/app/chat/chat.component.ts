import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  name: string;
  message: string;

  constructor() {
    this.name = "Guest";
    this.message = "";
  }

  ngOnInit(): void {
  }

  submitMessage() {
    console.log(this.message);
    this.message = "";
  }

}

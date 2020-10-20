import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { ChatMessage } from '../../models/chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  name: string;
  message: string;
  messages: ChatMessage[];

  constructor(private chatService: ChatService) {
    this.name = "Guest";
    this.message = "";
    this.messages = [];

    this.chatService.messageReceived.subscribe((message: ChatMessage) => {
      this.messages.push(message);
    })
  }

  ngOnInit(): void {
  }

  send() {
    let chatMessage = {
      user: this.name,
      message: this.message,
    } as ChatMessage;

    this.chatService.sendMessage(chatMessage);

    this.message = "";
  }
}

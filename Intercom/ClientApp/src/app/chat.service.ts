import { Injectable, Inject, EventEmitter } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { ChatMessage } from '../models/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  hubConnection: HubConnection;
  messageReceived = new EventEmitter<ChatMessage>();

  constructor(@Inject('BASE_URL') private baseUrl: string) {
    let hubUrl = `${this.baseUrl}hub/chat`;
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start();

    this.hubConnection.on('ReceiveMessage', (message: ChatMessage) => {
      if (message) {
        this.messageReceived.emit(message);
      }
    })
  }

  sendMessage(message: ChatMessage) {
    this.hubConnection.send('SendMessage', message);
  }
}

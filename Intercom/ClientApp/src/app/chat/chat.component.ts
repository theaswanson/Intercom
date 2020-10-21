import { Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { ChatMessage } from '../../models/chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {

  @ViewChild('scrollframe', { static: false }) scrollFrame: ElementRef;
  @ViewChildren('item') itemElements: QueryList<any>;

  private scrollContainer: any;

  name: string;
  message: string;
  messages: ChatMessage[];
  isNearBottom: boolean;

  constructor(private chatService: ChatService) {
    this.name = "Guest";
    this.message = "";
    this.messages = [];
    this.isNearBottom = true;

    this.chatService.messageReceived.subscribe((message: ChatMessage) => {
      this.messages.push(message);
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.scrollContainer = this.scrollFrame.nativeElement;
    this.itemElements.changes.subscribe(_ => this.onItemElementsChanged());
  }

  send() {
    let chatMessage = {
      user: this.name,
      message: this.message,
    } as ChatMessage;

    this.chatService.sendMessage(chatMessage);

    this.message = "";
  }

  scrolled(event: any): void {
    this.isNearBottom = this.isUserNearBottom();
  }

  private onItemElementsChanged(): void {
    if (this.isNearBottom) {
      this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  private isUserNearBottom(): boolean {
    const threshold = 100;
    const position = this.scrollContainer.scrollTop + this.scrollContainer.offsetHeight;
    const height = this.scrollContainer.scrollHeight;
    return position > height - threshold;
  }
}

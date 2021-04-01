import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  // childMessage:string=
  SendMessageFromChild:string
@Input() childMessage
@Output() newItemEvent = new EventEmitter<string>();

 @Output() Mess = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
    console.log("childMessage",this.childMessage)
 
  }
  sendMessage(){
    this.Mess.emit(this.SendMessageFromChild);
  }


  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }
}

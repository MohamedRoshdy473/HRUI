import { Component, OnInit, ViewChild } from '@angular/core';
import { ChildComponent } from '../child/child.component';
import { DataServiceService } from 'src/app/Services/data-service.service'
@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  parentMessage = "Message from parent";

  @ViewChild(ChildComponent) child
  message: string = '';
  constructor(private data: DataServiceService) { }
  items = ['item'];


  
  ngOnInit(): void {
  }
  ReceiveMessageFromChild($event) {
    this.message = $event
    console.log("messageFrom", this.message)
  }
  addItem(newItem: string) {
    this.items.push(newItem);
    console.log("items",this.items)
  }
}

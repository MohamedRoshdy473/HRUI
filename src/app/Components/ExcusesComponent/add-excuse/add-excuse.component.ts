import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Excuse } from 'src/app/Data_Types/excuse';
import { MenuItem, MessageService } from 'primeng/api';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { ExcuseService } from 'src/app/Services/excuse.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-excuse',
  templateUrl: './add-excuse.component.html',
  styleUrls: ['./add-excuse.component.css']
})
export class AddExcuseComponent implements OnInit {
  EmpId: Number
  Excuse: Excuse
  ExBool: boolean
  constructor(private ExcuseService: ExcuseService, private router: Router, private messageService: MessageService,) {
    this.Excuse = { Approved: "pending", Date: new Date(Date.now()), Comment: '', Hours: 0, Time: { hours: 0, minutes: 0 } };
  }

  ngOnInit(): void {
    this.EmpId = Number(localStorage.getItem('id'))
    this.ExcuseService.GetExcuseByEmployeeId(this.EmpId).subscribe(
      e => {
        this.ExBool = e
        if(this.ExBool==false)
        {
          this.messageService.add({ severity: 'error', summary: 'Excuse', detail: 'You have one excuse before can not add excuse again for this month', sticky: true });
        }
        console.log("e", e);
      }
    )


  }
  add() {
    this.showSuccess()
    // this.messageService.add({ severity: 'info', summary: 'Record Deleted!', detail: 'Record Deleted!' ,});
    this.ExcuseService.addExcuse(this.Excuse).subscribe(
      res => {
        var usrRole = localStorage.getItem("roles");
        if (usrRole == "Admin") {
          this.router.navigate(['/AllExcuses']);
        }
        if (usrRole == "User") {
          this.router.navigate(['/AllExcuses']);
        }
      },
      error => console.log(error),
    );
  }
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }

  showInfo() {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content' });
  }

  showWarn() {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Message Content' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
  }

  showTopLeft() {
    this.messageService.add({ key: 'tl', severity: 'info', summary: 'Info', detail: 'Message Content' });
  }

  showTopCenter() {
    this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Message Content' });
  }

  showBottomCenter() {
    this.messageService.add({ key: 'bc', severity: 'info', summary: 'Info', detail: 'Message Content' });
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed' });
  }

  showMultiple() {
    this.messageService.addAll([
      { severity: 'info', summary: 'Message 1', detail: 'Message Content' },
      { severity: 'info', summary: 'Message 2', detail: 'Message Content' },
      { severity: 'info', summary: 'Message 3', detail: 'Message Content' }
    ]);
  }

  showSticky() {
    this.messageService.add({ severity: 'info', summary: 'Sticky', detail: 'Message Content', sticky: true });
  }

  onConfirm() {
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }
}

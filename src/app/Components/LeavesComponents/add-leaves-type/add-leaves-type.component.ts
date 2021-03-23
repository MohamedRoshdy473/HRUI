import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LeaveTypeService } from 'src/app/Services/leave-type.service';

@Component({
  selector: 'app-add-leaves-type',
  templateUrl: './add-leaves-type.component.html',
  styleUrls: ['./add-leaves-type.component.css']
})
export class AddLeavesTypeComponent implements OnInit {
  leaveTypeObj:any;
  leaveTypeList:any;
  constructor(private leaveTypesService:LeaveTypeService,private router :Router,
    private confirmationService: ConfirmationService, private messageService: MessageService) { 
    this.leaveTypeObj={Id:0,Name:""}
      }

  ngOnInit(): void {
  }
  AddleaveType()
  {
    this.leaveTypesService.AddLeavesType(this.leaveTypeObj).subscribe(
        res=>{this.router.navigate(['/LeavesType']);},
        err=>console.log(err)
    );
  }
}

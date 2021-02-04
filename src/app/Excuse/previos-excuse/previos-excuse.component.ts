import { Component, OnInit } from '@angular/core';
import {ExcuseService} from 'src/app/Services/excuse.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-previos-excuse',
  templateUrl: './previos-excuse.component.html',
  styleUrls: ['./previos-excuse.component.css']
})
export class PreviosExcuseComponent implements OnInit {

  constructor(private ExcuseService:ExcuseService,private router:Router) { }

  PreviousExcuses:any;
  ngOnInit(): void {
    this.ExcuseService.PreviousExcuses().subscribe(
      data=>{this.PreviousExcuses=data},
      error=>{console.log(error)}
    );
  }

}

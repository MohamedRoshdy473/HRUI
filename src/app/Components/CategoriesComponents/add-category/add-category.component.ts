import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  category: any;
  constructor(private categoryservice: CategoryService,private router :Router,private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.category={Id:0,Name:''}
   }

  ngOnInit(): void {
  }
AddCategory()
{
  this.categoryservice.addCategory(this.category).subscribe(
      res=>{this.router.navigate(['/Categories']);},
      err=>console.log(err)
  );
}
}

import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/Services/category.service';
import { SubCategoryServiceService } from 'src/app/Services/sub-category-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.css']
})
export class AddSubCategoryComponent implements OnInit {
category:any;
subcategoryObj:any;
  constructor(private categoryservice :CategoryService,private subcategoryservice :SubCategoryServiceService,private router:Router,private confirmationService: ConfirmationService, private messageService: MessageService) { 
    this.subcategoryObj = { Id: 0, SubCategoryName: '', categoryName: '', categoryID: 0 }
  }

  ngOnInit(): void {
    this.categoryservice.getAllcategory().subscribe(
      (res)=>{this.category=res;},
      (err)=>console.log(err)
    )
  }
  addsubcategory()
  {
    this.subcategoryObj.categoryID=Number(this.subcategoryObj.categoryID);
    this.subcategoryservice.addsubCategory(this.subcategoryObj).subscribe(
      res=>{this.router.navigate(['/SubCategories']);},
      err=>console.log(err),
    )
  }
}

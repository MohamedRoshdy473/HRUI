import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/Services/category.service';
import { SubCategoryServiceService } from 'src/app/Services/sub-category-service.service';

@Component({
  selector: 'app-edit-sub-category',
  templateUrl: './edit-sub-category.component.html',
  styleUrls: ['./edit-sub-category.component.css']
})
export class EditSubCategoryComponent implements OnInit {
  subCategoryObj: any;
  Categories: any;

  constructor(private subCategoryService: SubCategoryServiceService, private categoryService: CategoryService, private router: Router
    , private activeRoute: ActivatedRoute, public datepipe: DatePipe,
    private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.subCategoryObj = { ID: 0, SubCategoryName: '', categoryName: '', categoryID: 0 }
  }
  SubCategoryID =this.activeRoute.snapshot.params['id'];
  ngOnInit(): void {
    this.categoryService.getAllcategory().subscribe(
      res => this.Categories = res,
      err => console.log(err)
    )
    this.subCategoryService.getsubCategoryByID(this.SubCategoryID).subscribe(
      (res) => {
        this.subCategoryObj = res;
        console.log(this.subCategoryObj);
      },
      (err) => { console.log(err) }
    );
  }
  update() {
    // console.log(this.subCategoryObj.subCategoryName)
    // console.log(this.subCategoryObj.id)
    // console.log(this.subCategoryObj.categoryID)


    var data={
      ID:this.subCategoryObj.id,
      SubCategoryName:this.subCategoryObj.subCategoryName,
      categoryID:Number(this.subCategoryObj.categoryID)

    }
    this.subCategoryService.editsubCategory(this.SubCategoryID,data).subscribe(
      res => {
        console.log(res);
        this.messageService.add({ severity: 'info', summary: 'Record Updated!', detail: 'Record Updated!' });
        this.router.navigate(['/SubCategories']);
      },
      error => console.log(error),
    )
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

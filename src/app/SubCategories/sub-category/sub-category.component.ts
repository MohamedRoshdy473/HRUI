import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SubCategoryServiceService } from 'src/app/Services/sub-category-service.service';
import { DropdownModule } from 'primeng/dropdown';
import { CategoryService } from 'src/app/Services/category.service';
@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  subcategorydisplay: any;
  subcategoryObj: any;
  categories: any;
  selectcategory: any;
  categoryID:Number;
  displayBasic: boolean;
  loading: boolean = true;
  submitted: boolean;
  representatives: { name: string; image: string; }
  @ViewChild('dt') table: Table;
  constructor(private subCategoryService: SubCategoryServiceService, 
    private categoryService: CategoryService,
     private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.subcategoryObj = { ID: 0, SubCategoryName: '', categoryName: '', categoryID: 0 }
  }

  ngOnInit(): void {
    this.subCategoryService.getAllsubcategory().subscribe(
      (data) => {
        this.subcategorydisplay = data;
        console.log(data);
        this.loading = false;
      })
    this.categoryService.getAllcategory().subscribe(
      res => this.categories = res,
      err => console.log(err)
    )
  }

  onOptionsSelected(categoryId:number){
    console.log("the selected value is " + categoryId);
    this.subCategoryService.getsubCategoryByCategoryID(categoryId).subscribe(
        res=> {
          console.log(res);
          this.subcategorydisplay=res     
        },
        err=>console.log(err)
      )
}

// ngOnChanged(categoryId:number) {
// this.subCategoryService.getsubCategoryByCategoryID(categoryId).subscribe(
//   res=> {
//     console.log(res);
//     this.subcategorydisplay=res
  
//   },
//   err=>console.log(err)
// )
  
// }
  onRepresentativeChange(event) {
    this.table.filter(event.value, 'type', 'in')
  }

  showBasicDialog(id) {
    this.displayBasic = true;
    console.log(id);
    this.subCategoryService.getsubCategoryByID(id).subscribe(
      data => {
        this.subcategoryObj = data
          ,
          console.log(data)
      },
      error => { console.log(error) }
    )
  }

  confirm(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.subCategoryService.deletesubCategory(id).subscribe(
          data => {
            this.ngOnInit(),
              this.messageService.add({ severity: 'info', summary: 'Record Deleted!', detail: 'Record Deleted!' });
          }
        )
      }
    });
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

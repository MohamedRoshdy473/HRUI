import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { Child1Component } from './main/child1/child1.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { AddEmployeeComponent } from './Employee/add-employee/add-employee.component';
import { AuthGuard } from 'src/app/Guards/auth.guard'
import { DisplayAllEmployeesComponent } from './Employee/display-all-employees/display-all-employees.component';
import { from } from 'rxjs';
import { EditEmployeeComponent } from './Employee/edit-employee/edit-employee.component';
import { AllExcusesComponent } from './Excuse/all-excuses/all-excuses.component';
import { AddExcuseComponent } from './Excuse/add-excuse/add-excuse.component';
import { PreviosExcuseComponent } from './Excuse/previos-excuse/previos-excuse.component';
import { ErrorInterceptor } from '../app/Data_Types/error.interceptor';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { AddLeaveComponent } from './Leaves/add-leave/add-leave.component';
import { AllLeavesComponent } from './Leaves/all-leaves/all-leaves.component';
import { PreviousLeavesComponent } from './Leaves/previous-leaves/previous-leaves.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { AllUsersComponent } from './Users/all-users/all-users.component';
import { AddUserComponent } from './Users/add-user/add-user.component';
import { ChangePasswordComponent } from './Auth/change-password/change-password.component';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DragDropModule } from 'primeng/dragdrop';
import { PickListModule } from 'primeng/picklist';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AttendanceOUTComponent } from './attendance/attendance-out/attendance-out.component';
import { AttendanceINComponent } from './attendance/attendance-in/attendance-in.component';
import { NeedRequestsComponent } from './NeedRequest/need-requests/need-requests.component';
import { AddNeedRequestComponent } from './NeedRequest/add-need-request/add-need-request.component';
import { EditneedRequestComponent } from './NeedRequest/editneed-request/editneed-request.component';
import { CategoryComponent } from './Categories/category/category.component';
import { AddCategoryComponent } from './Categories/add-category/add-category.component';
import { EditCategoryComponent } from './Categories/edit-category/edit-category.component';
import { SubCategoryComponent } from './SubCategories/sub-category/sub-category.component';
import { AddSubCategoryComponent } from './SubCategories/add-sub-category/add-sub-category.component';
import { EditSubCategoryComponent } from './SubCategories/edit-sub-category/edit-sub-category.component';
import { DisplayNeedRequestEmpComponent } from './NeedRequestEmployee/display-need-request-emp/display-need-request-emp.component';
import { AddNeedRequestEmpComponent } from './NeedRequestEmployee/add-need-request-emp/add-need-request-emp.component';
import { EvaluationTypeComponent } from './Evaluations/evaluation-type/evaluation-type.component';
import { EvaluationProfessionComponent } from './Evaluations/evaluation-profession/evaluation-profession.component';
import { AddEvaluationTypeComponent } from './Evaluations/add-evaluation-type/add-evaluation-type.component';
import { EditEvaluationTypeComponent } from './Evaluations/edit-evaluation-type/edit-evaluation-type.component';
import { AddEvaluationProfessionComponent } from './Evaluations/add-evaluation-profession/add-evaluation-profession.component';
import { EditEvaluationProfessionComponent } from './Evaluations/edit-evaluation-profession/edit-evaluation-profession.component';
import { EditNeedRequestEmpComponent } from './NeedRequestEmployee/edit-need-request-emp/edit-need-request-emp.component';
import { DisplayEvaluationsComponent } from './Evaluations/display-evaluations/display-evaluations.component';
import { AddEvaluationComponent } from './Evaluations/add-evaluation/add-evaluation.component';
import { EditEvaluationComponent } from './Evaluations/edit-evaluation/edit-evaluation.component';
import { RatingModule } from 'primeng/rating';
//import { StarRatingModule } from 'angular-star-rating';
import{MatSnackBarModule} from '@angular/material/snack-bar';
import{MatTooltipModule} from '@angular/material/tooltip'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CertificateComponent } from './Certificates/certificate/certificate.component';
import { AddCertificatesComponent } from './Certificates/add-certificates/add-certificates.component';
import { EditCertificatesComponent } from './Certificates/edit-certificates/edit-certificates.component';
import { TrainingTypeComponent } from './TrainingTypes/training-type/training-type.component';
import { AddTrainingTypeComponent } from './TrainingTypes/add-training-type/add-training-type.component';
import { EditTrainingTypeComponent } from './TrainingTypes/edit-training-type/edit-training-type.component';
import { CoursesComponent } from './Course/courses/courses.component';
import { AddCourseComponent } from './Course/add-course/add-course.component';
import { EditCourseComponent } from './Course/edit-course/edit-course.component';
import { TrainingProfessionComponent } from './TrainingProfessions/training-profession/training-profession.component';
import { AddTrainingProfessionComponent } from './TrainingProfessions/add-training-profession/add-training-profession.component';
import { EditTrainingProfessionComponent } from './TrainingProfessions/edit-training-profession/edit-training-profession.component';
import { TrainingsComponent } from './Training/trainings/trainings.component';
import { AddTrainingComponent } from './Training/add-training/add-training.component';
import { EditTrainingComponent } from './Training/edit-training/edit-training.component';
import {MatDialog} from '@angular/material/dialog';
import { NotFoundComponent } from './not-found/not-found.component';
import { RequestTrainingComponent } from './Training/request-training/request-training.component';
import { AddRequestTrainingComponent } from './Training/add-request-training/add-request-training.component';
import { EditRequestTrainingComponent } from './Training/edit-request-training/edit-request-training.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';



import {A11yModule} from '@angular/cdk/a11y';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTreeModule} from '@angular/material/tree';
import {BidiModule} from '@angular/cdk/bidi';
import { LeavesTypeComponent } from './Leaves/leaves-type/leaves-type.component';
import { AddLeavesTypeComponent } from './Leaves/add-leaves-type/add-leaves-type.component';
import { EditLeavesTypeComponent } from './Leaves/edit-leaves-type/edit-leaves-type.component';
import { InstructorComponent } from './Instructors/instructor/instructor.component';
import { AddInstructorComponent } from './Instructors/add-instructor/add-instructor.component';
import { EditInstructorComponent } from './Instructors/edit-instructor/edit-instructor.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProfileComponent } from './Auth/profile/profile.component';
import { NgxPrintModule } from 'ngx-print';
import { DisplayPositionLevelsComponent } from './PositionLevel/display-position-levels/display-position-levels.component';
import { DisplayAllPositionsComponent } from './Positions/display-all-positions/display-all-positions.component';
import { DisplayProfessionsComponent } from './Profession/display-professions/display-professions.component';
import { DisplayUniversitiesComponent } from './Universities/display-universities/display-universities.component';
import { DisplayFacultiesComponent } from './Faculties/display-faculties/display-faculties.component';
import { DisplayFacultydepartmentsComponent } from './FacultyDepartments/display-facultydepartments/display-facultydepartments.component';
import { EditLeaveRequestComponent } from './Leaves/edit-leave-request/edit-leave-request.component';









export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
@NgModule({
  declarations: [
    
    AppComponent,
    NavbarComponent,
    SideNavComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    Child1Component,
    AddEmployeeComponent,
    DisplayAllEmployeesComponent,
    EditEmployeeComponent,
    AllExcusesComponent,
    AddExcuseComponent,
    PreviosExcuseComponent,
    AddLeaveComponent,
    AllLeavesComponent,
    PreviousLeavesComponent,
    AllUsersComponent,
    AddUserComponent,
    ChangePasswordComponent,
    AttendanceOUTComponent,
    AttendanceINComponent,
    NeedRequestsComponent,
    AddNeedRequestComponent,
    EditneedRequestComponent,
    CategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    SubCategoryComponent,
    AddSubCategoryComponent,
    EditSubCategoryComponent,
    DisplayNeedRequestEmpComponent,
    AddNeedRequestEmpComponent,
    EvaluationTypeComponent,
    EvaluationProfessionComponent,
    AddEvaluationTypeComponent,
    EditEvaluationTypeComponent,
    AddEvaluationProfessionComponent,
    EditEvaluationProfessionComponent,
    EditNeedRequestEmpComponent,
    DisplayEvaluationsComponent,
    AddEvaluationComponent,
    EditEvaluationComponent,
    CertificateComponent,
    AddCertificatesComponent,
    EditCertificatesComponent,
    TrainingTypeComponent,
    AddTrainingTypeComponent,
    EditTrainingTypeComponent,
    CoursesComponent,
    AddCourseComponent,
    EditCourseComponent,
    TrainingProfessionComponent,
    AddTrainingProfessionComponent,
    EditTrainingProfessionComponent,
    TrainingsComponent,
    AddTrainingComponent,
    EditTrainingComponent,
    NotFoundComponent,
    RequestTrainingComponent,
    AddRequestTrainingComponent,
    EditRequestTrainingComponent,
    LeavesTypeComponent,
    AddLeavesTypeComponent,
    EditLeavesTypeComponent,
    InstructorComponent,
    AddInstructorComponent,
    EditInstructorComponent,
    MainPageComponent,
    ProfileComponent,
    DisplayPositionLevelsComponent,
    DisplayAllPositionsComponent,
    DisplayProfessionsComponent,
    DisplayUniversitiesComponent,
    DisplayFacultiesComponent,
    DisplayFacultydepartmentsComponent,
    EditLeaveRequestComponent,

  ],
  imports: [
    NgxPrintModule,
    BrowserModule,RatingModule ,
    FormsModule,
    ReactiveFormsModule ,
    AppRoutingModule,
    AccordionModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    RadioButtonModule,
    TabViewModule,
    CalendarModule,
    DropdownModule,
    InputMaskModule,
    TableModule,
    ToastModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DialogModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    ToastModule,
    MatSliderModule,
    MatIconModule,
    ConfirmDialogModule,
    DragDropModule,
    PickListModule,
    MatInputModule,
    MatDatepickerModule,MatNativeDateModule,MatFormFieldModule,RatingModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatIconModule,


    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    BidiModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    ConfirmationService,
    MessageService,
    AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {provide : LocationStrategy , useClass: HashLocationStrategy},

    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
 }

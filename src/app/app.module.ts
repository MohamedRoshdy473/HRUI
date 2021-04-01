import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/SideNavComponents/navbar/navbar.component';
import { SideNavComponent } from 'src/app/Components/SideNavComponents/side-nav/side-nav.component';
import { LoginComponent } from 'src/app/Components/AuthComponents/login/login.component'
import { RegisterComponent } from 'src/app/Components/AuthComponents/register/register.component'
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
import { AddEmployeeComponent } from './Components/EmployeeComponent/add-employee/add-employee.component';
import { AuthGuard } from 'src/app/Guards/auth.guard'
import { DisplayAllEmployeesComponent } from './Components/EmployeeComponent/display-all-employees/display-all-employees.component';
import { from } from 'rxjs';
import { EditEmployeeComponent } from './Components/EmployeeComponent/edit-employee/edit-employee.component';
import { AllExcusesComponent } from './Components/ExcusesComponent/all-excuses/all-excuses.component';
import { AddExcuseComponent } from './Components/ExcusesComponent/add-excuse/add-excuse.component';
import { PreviosExcuseComponent } from './Components/ExcusesComponent/previos-excuse/previos-excuse.component';
import { ErrorInterceptor } from '../app/Data_Types/error.interceptor';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { AddLeaveComponent } from './Components/LeavesComponents/add-leave/add-leave.component';
import { AllLeavesComponent } from 'src/app/Components/LeavesComponents/all-leaves/all-leaves.component';
import { PreviousLeavesComponent } from 'src/app/Components/LeavesComponents/previous-leaves/previous-leaves.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { AllUsersComponent } from './Components/UsersComponents/all-users/all-users.component';
import { AddUserComponent } from './Components/UsersComponents/add-user/add-user.component';
import { ChangePasswordComponent } from './Components/AuthComponents/change-password/change-password.component';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DragDropModule } from 'primeng/dragdrop';
import { PickListModule } from 'primeng/picklist';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AttendanceOUTComponent } from './Components/AttendanceComponents/attendance-out/attendance-out.component';
import { AttendanceINComponent } from './Components/AttendanceComponents/attendance-in/attendance-in.component';
import { NeedRequestsComponent } from 'src/app/Components/NeedsRequestsComponensts/need-requests/need-requests.component';
import { AddNeedRequestComponent } from './Components/NeedsRequestsComponensts/add-need-request/add-need-request.component';
import { EditneedRequestComponent } from 'src/app/Components/NeedsRequestsComponensts/editneed-request/editneed-request.component';
import { CategoryComponent } from 'src/app/Components/CategoriesComponents/category/category.component';
import { AddCategoryComponent } from './Components/CategoriesComponents/add-category/add-category.component';
import { EditCategoryComponent } from 'src/app/Components/CategoriesComponents/edit-category/edit-category.component';
import { SubCategoryComponent } from 'src/app/Components/SubCategoriesComponents/sub-category/sub-category.component';
import { AddSubCategoryComponent } from './Components/SubCategoriesComponents/add-sub-category/add-sub-category.component';
import { EditSubCategoryComponent } from 'src/app/Components/SubCategoriesComponents/edit-sub-category/edit-sub-category.component';
import { DisplayNeedRequestEmpComponent } from 'src/app/Components/NeedsRequestsComponensts/display-need-request-emp/display-need-request-emp.component';
import { AddNeedRequestEmpComponent } from 'src/app/Components/NeedsRequestsComponensts/add-need-request-emp/add-need-request-emp.component';
import { EvaluationTypeComponent } from 'src/app/Components/EvaluationsComponents/evaluation-type/evaluation-type.component';
import { EvaluationProfessionComponent } from 'src/app/Components/EvaluationsComponents/evaluation-profession/evaluation-profession.component';
import { AddEvaluationTypeComponent } from 'src/app/Components/EvaluationsComponents/add-evaluation-type/add-evaluation-type.component';
import { EditEvaluationTypeComponent } from 'src/app/Components/EvaluationsComponents/edit-evaluation-type/edit-evaluation-type.component';
import { AddEvaluationProfessionComponent } from 'src/app/Components/EvaluationsComponents/add-evaluation-profession/add-evaluation-profession.component';
import { EditEvaluationProfessionComponent } from 'src/app/Components/EvaluationsComponents/edit-evaluation-profession/edit-evaluation-profession.component';
import { EditNeedRequestEmpComponent } from 'src/app/Components/NeedsRequestsComponensts/edit-need-request-emp/edit-need-request-emp.component';
import { DisplayEvaluationsComponent } from 'src/app/Components/EvaluationsComponents/display-evaluations/display-evaluations.component';
import { AddEvaluationComponent } from './Components/EvaluationsComponents/add-evaluation/add-evaluation.component';
import { EditEvaluationComponent } from 'src/app/Components/EvaluationsComponents/edit-evaluation/edit-evaluation.component';
import { RatingModule } from 'primeng/rating';
//import { StarRatingModule } from 'angular-star-rating';
import{MatSnackBarModule} from '@angular/material/snack-bar';
import{MatTooltipModule} from '@angular/material/tooltip'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CertificateComponent } from 'src/app/Components/CertificatesComponents/certificate/certificate.component';
import { AddCertificatesComponent } from './Components/CertificatesComponents/add-certificates/add-certificates.component';
import { EditCertificatesComponent } from 'src/app/Components/CertificatesComponents/edit-certificates/edit-certificates.component';
import { TrainingTypeComponent } from 'src/app/Components/TrainingComponents/training-type/training-type.component';
import { AddTrainingTypeComponent } from 'src/app/Components/TrainingComponents/add-training-type/add-training-type.component';
import { EditTrainingTypeComponent } from 'src/app/Components/TrainingComponents/edit-training-type/edit-training-type.component';
import { AddCourseComponent } from './Components/CourseComponents/add-course/add-course.component';
import { EditCourseComponent } from 'src/app/Components/CourseComponents/edit-course/edit-course.component';
import { TrainingProfessionComponent } from 'src/app/Components/TrainingComponents/training-profession/training-profession.component';
import { AddTrainingProfessionComponent } from 'src/app/Components/TrainingComponents/add-training-profession/add-training-profession.component';
import { EditTrainingProfessionComponent } from 'src/app/Components/TrainingComponents/edit-training-profession/edit-training-profession.component';
import { TrainingsComponent } from 'src/app/Components/TrainingComponents/trainings/trainings.component';
import { AddTrainingComponent } from 'src/app/Components/TrainingComponents/add-training/add-training.component';
import { EditTrainingComponent } from 'src/app/Components/TrainingComponents/edit-training/edit-training.component';
import {MatDialog} from '@angular/material/dialog';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { RequestTrainingComponent } from 'src/app/Components/TrainingComponents/request-training/request-training.component';
import { AddRequestTrainingComponent } from './Components/TrainingComponents/add-request-training/add-request-training.component';
import { EditRequestTrainingComponent } from 'src/app/Components/TrainingComponents/edit-request-training/edit-request-training.component';
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
import { LeavesTypeComponent } from 'src/app/Components/LeavesComponents/leaves-type/leaves-type.component';
import { AddLeavesTypeComponent } from 'src/app/Components/LeavesComponents/add-leaves-type/add-leaves-type.component';
import { EditLeavesTypeComponent } from 'src/app/Components/LeavesComponents/edit-leaves-type/edit-leaves-type.component';
import { InstructorComponent } from 'src/app/Components/InstructorsComponents/instructor/instructor.component';
import { AddInstructorComponent } from './Components/InstructorsComponents/add-instructor/add-instructor.component';
import { EditInstructorComponent } from 'src/app/Components/InstructorsComponents/edit-instructor/edit-instructor.component';
import { MainPageComponent } from './Components/main-page/main-page.component';
import { ProfileComponent } from 'src/app/Components/AuthComponents/profile/profile.component';
import { NgxPrintModule } from 'ngx-print';
import { DisplayPositionLevelsComponent } from './Components/PositionLevelComponent/display-position-levels/display-position-levels.component';
import { DisplayAllPositionsComponent } from './Components/PositionsComponent/display-all-positions/display-all-positions.component';
import { DisplayProfessionsComponent } from './Components/ProfessionsComponents/display-professions/display-professions.component';
import { DisplayUniversitiesComponent } from './Components/UniversityComponent/display-universities/display-universities.component';
import { DisplayFacultiesComponent } from './Components/FacultyComponent/display-faculties/display-faculties.component';
import { DisplayFacultydepartmentsComponent } from './Components/FacultyComponent/display-facultydepartments/display-facultydepartments.component';
import { EditLeaveRequestComponent } from 'src/app/Components/LeavesComponents/edit-leave-request/edit-leave-request.component';
import { PieChartsComponent } from './Components/pie-charts/pie-charts.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ReportViewerModule } from 'ngx-ssrs-reportviewer';
import { ReportExcuseComponent } from './Components/Reports-Components/report-excuse/report-excuse.component';
import { ReportLeavesComponent } from './Components/Reports-Components/report-leaves/report-leaves.component';
import { EmployeeFullReportComponent } from './Components/Reports-Components/employee-full-report/employee-full-report.component';
import { ReportAttendanceComponent } from './Components/Reports-Components/report-attendance/report-attendance.component';
import { CustomDatePipe } from './Pipes/custom-date.pipe';
import { CoursesComponent } from './Components/CourseComponents/Courses/courses.component';
import { ForgetPasswordComponent } from './Components/AuthComponents/forget-password/forget-password.component';
import { ResetPasswordComponent } from './Components/AuthComponents/reset-password/reset-password.component';
import { ParentComponent } from './Components/InputAndOutput/parent/parent.component';
import { ChildComponent } from './Components/InputAndOutput/child/child.component';









export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
@NgModule({
  declarations: [
    
    AppComponent,
    NavbarComponent,
    SideNavComponent,
    LoginComponent,
    RegisterComponent,
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
    PieChartsComponent,
    ReportExcuseComponent,
    ReportLeavesComponent,
    EmployeeFullReportComponent,
    ReportAttendanceComponent,
    CustomDatePipe,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    ParentComponent,
    ChildComponent,

  ],
  imports: [
    NgxPrintModule,
    ReportViewerModule ,
    NgApexchartsModule,
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

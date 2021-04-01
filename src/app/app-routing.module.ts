import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/Components/AuthComponents/login/login.component';
import { RegisterComponent } from 'src/app/Components/AuthComponents/register/register.component';
import { SideNavComponent } from 'src/app/Components/SideNavComponents/side-nav/side-nav.component'
import { AddEmployeeComponent } from './Components/EmployeeComponent/add-employee/add-employee.component';
import { DisplayAllEmployeesComponent } from './Components/EmployeeComponent/display-all-employees/display-all-employees.component';
import { EditEmployeeComponent } from './Components/EmployeeComponent/edit-employee/edit-employee.component';
import { AddExcuseComponent } from './Components/ExcusesComponent/add-excuse/add-excuse.component';
import {AuthGuard} from 'src/app/Guards/auth.guard'
import {AdminGuard} from 'src/app/Guards/admin.guard'
import { from } from 'rxjs';
import { PreviosExcuseComponent } from './Components/ExcusesComponent/previos-excuse/previos-excuse.component';
import { AllExcusesComponent } from './Components/ExcusesComponent/all-excuses/all-excuses.component';
import { AddLeaveComponent } from './Components/LeavesComponents/add-leave/add-leave.component';
import { PreviousLeavesComponent } from 'src/app/Components/LeavesComponents/previous-leaves/previous-leaves.component';
import { AllLeavesComponent } from 'src/app/Components/LeavesComponents/all-leaves/all-leaves.component';
import { AllUsersComponent } from './Components/UsersComponents/all-users/all-users.component';
import { ChangePasswordComponent } from './Components/AuthComponents/change-password/change-password.component';
import { AttendanceOUTComponent } from './Components/AttendanceComponents/attendance-out/attendance-out.component';
import { AttendanceINComponent } from './Components/AttendanceComponents/attendance-in/attendance-in.component';
import { NeedRequestsComponent } from 'src/app/Components/NeedsRequestsComponensts/need-requests/need-requests.component';
import { AddNeedRequestComponent } from './Components/NeedsRequestsComponensts/add-need-request/add-need-request.component';
import { EditneedRequestComponent } from 'src/app/Components/NeedsRequestsComponensts/editneed-request/editneed-request.component';
import{ CategoryComponent } from 'src/app/Components/CategoriesComponents/category/category.component';
import { EditCategoryComponent } from 'src/app/Components/CategoriesComponents/edit-category/edit-category.component';
import { AddCategoryComponent } from './Components/CategoriesComponents/add-category/add-category.component';
import { SubCategoryComponent } from 'src/app/Components/SubCategoriesComponents/sub-category/sub-category.component'
import { AddSubCategoryComponent } from './Components/SubCategoriesComponents/add-sub-category/add-sub-category.component';
import { EditSubCategoryComponent } from 'src/app/Components/SubCategoriesComponents/edit-sub-category/edit-sub-category.component';
import { DisplayNeedRequestEmpComponent } from 'src/app/Components/NeedsRequestsComponensts/display-need-request-emp/display-need-request-emp.component';
import { AddNeedRequestEmpComponent } from 'src/app/Components/NeedsRequestsComponensts/add-need-request-emp/add-need-request-emp.component';
import { EvaluationTypeComponent } from 'src/app/Components/EvaluationsComponents/evaluation-type/evaluation-type.component'
import { AddEvaluationTypeComponent } from 'src/app/Components/EvaluationsComponents/add-evaluation-type/add-evaluation-type.component';
import { EditEvaluationTypeComponent } from 'src/app/Components/EvaluationsComponents/edit-evaluation-type/edit-evaluation-type.component';
import { EvaluationProfessionComponent } from 'src/app/Components/EvaluationsComponents/evaluation-profession/evaluation-profession.component';
import { EditEvaluationProfessionComponent } from 'src/app/Components/EvaluationsComponents/edit-evaluation-profession/edit-evaluation-profession.component';
import { AddEvaluationProfessionComponent } from 'src/app/Components/EvaluationsComponents/add-evaluation-profession/add-evaluation-profession.component';
import { EditNeedRequestEmpComponent } from 'src/app/Components/NeedsRequestsComponensts/edit-need-request-emp/edit-need-request-emp.component';
import { DisplayEvaluationsComponent } from 'src/app/Components/EvaluationsComponents/display-evaluations/display-evaluations.component';
import { AddEvaluationComponent } from './Components/EvaluationsComponents/add-evaluation/add-evaluation.component';
import { EditEvaluationComponent } from 'src/app/Components/EvaluationsComponents/edit-evaluation/edit-evaluation.component';
import { CertificateComponent } from 'src/app/Components/CertificatesComponents/certificate/certificate.component';
import { AddCertificatesComponent } from './Components/CertificatesComponents/add-certificates/add-certificates.component';
import { EditCertificatesComponent } from 'src/app/Components/CertificatesComponents/edit-certificates/edit-certificates.component';
import { TrainingTypeComponent } from 'src/app/Components/TrainingComponents/training-type/training-type.component'
import { AddTrainingTypeComponent } from 'src/app/Components/TrainingComponents/add-training-type/add-training-type.component';
import { EditTrainingTypeComponent } from 'src/app/Components/TrainingComponents/edit-training-type/edit-training-type.component';
import { CoursesComponent } from 'src/app/Components/CourseComponents/Courses/courses.component';
import { AddCourseComponent } from './Components/CourseComponents/add-course/add-course.component';
import { EditCourseComponent } from 'src/app/Components/CourseComponents/edit-course/edit-course.component';
import { TrainingProfessionComponent } from 'src/app/Components/TrainingComponents/training-profession/training-profession.component';
import { AddTrainingProfessionComponent } from 'src/app/Components/TrainingComponents/add-training-profession/add-training-profession.component';
import { EditTrainingProfessionComponent } from 'src/app/Components/TrainingComponents/edit-training-profession/edit-training-profession.component';
import { TrainingsComponent } from 'src/app/Components/TrainingComponents/trainings/trainings.component';
import { AddTrainingComponent } from 'src/app/Components/TrainingComponents/add-training/add-training.component';
import { EditTrainingComponent } from 'src/app/Components/TrainingComponents/edit-training/edit-training.component';
import { RequestTrainingComponent } from 'src/app/Components/TrainingComponents/request-training/request-training.component';
import { AddRequestTrainingComponent } from './Components/TrainingComponents/add-request-training/add-request-training.component';
import { EditRequestTrainingComponent } from 'src/app/Components/TrainingComponents/edit-request-training/edit-request-training.component';
import { LeavesTypeComponent } from 'src/app/Components/LeavesComponents/leaves-type/leaves-type.component'
import { AddLeavesTypeComponent } from 'src/app/Components/LeavesComponents/add-leaves-type/add-leaves-type.component';
import { EditLeavesTypeComponent } from 'src/app/Components/LeavesComponents/edit-leaves-type/edit-leaves-type.component';
import { InstructorComponent } from 'src/app/Components/InstructorsComponents/instructor/instructor.component'
import { AddInstructorComponent } from './Components/InstructorsComponents/add-instructor/add-instructor.component';
import { EditInstructorComponent } from 'src/app/Components/InstructorsComponents/edit-instructor/edit-instructor.component';
import { MainPageComponent } from './Components/main-page/main-page.component';
import { ProfileComponent } from 'src/app/Components/AuthComponents/profile/profile.component';
import { DisplayPositionLevelsComponent } from './Components/PositionLevelComponent/display-position-levels/display-position-levels.component';
import { DisplayAllPositionsComponent } from './Components/PositionsComponent/display-all-positions/display-all-positions.component';
import { DisplayProfessionsComponent } from './Components/ProfessionsComponents/display-professions/display-professions.component';
import { DisplayUniversitiesComponent } from './Components/UniversityComponent/display-universities/display-universities.component';
import { DisplayFacultiesComponent } from './Components/FacultyComponent/display-faculties/display-faculties.component';
import { DisplayFacultydepartmentsComponent } from './Components/FacultyComponent/display-facultydepartments/display-facultydepartments.component';
import { EditLeaveRequestComponent } from 'src/app/Components/LeavesComponents/edit-leave-request/edit-leave-request.component';
import { PieChartsComponent } from './Components/pie-charts/pie-charts.component';
import { ReportExcuseComponent } from './Components/Reports-Components/report-excuse/report-excuse.component';
import { ReportLeavesComponent } from './Components/Reports-Components/report-leaves/report-leaves.component';
import { EmployeeFullReportComponent } from './Components/Reports-Components/employee-full-report/employee-full-report.component';
import { ReportAttendanceComponent } from './Components/Reports-Components/report-attendance/report-attendance.component';
import { ForgetPasswordComponent } from './Components/AuthComponents/forget-password/forget-password.component';
import { ResetPasswordComponent } from './Components/AuthComponents/reset-password/reset-password.component';
import { ChildComponent } from './Components/InputAndOutput/child/child.component';
import { ParentComponent } from './Components/InputAndOutput/parent/parent.component';


const routes: Routes = [
  {path:'Register' , component:RegisterComponent  },
  {path:'login',component:LoginComponent},
  { path: 'Forgotpassword', component: ForgetPasswordComponent },
  { path: 'Resetpassword', component: ResetPasswordComponent },
  { path: 'changPaswword', component:ChangePasswordComponent },
  {path:'',component:SideNavComponent,canActivate:[AuthGuard] ,children: [
    { path: 'employee', component:DisplayAllEmployeesComponent },
    // ,canActivate:[AdminGuard]
    { path: 'child', component:ParentComponent },
    { path: 'addemployee', component:AddEmployeeComponent },
    { path: 'mainPage', component:PieChartsComponent },
    {path:'Profile',component:ProfileComponent}, 
    { path: 'editEmployee/:empId', component:EditEmployeeComponent },
    { path: 'AddExcuse', component:AddExcuseComponent},
    { path: 'previousExcuse', component:PreviosExcuseComponent },
    { path: 'AllExcuses', component:AllExcusesComponent},
    { path: 'EditLeaveRequest/:id', component:EditLeaveRequestComponent},
    { path: 'AddLeave', component:AddLeaveComponent },
    { path: 'previousLeave', component:PreviousLeavesComponent },
    { path: 'AllLeaves', component:AllLeavesComponent},
    { path: 'AllLUsers', component:AllUsersComponent},
    { path: 'attendanceIN', component:AttendanceINComponent },
    { path: 'attendanceout', component:AttendanceOUTComponent },
    { path: 'NeedRequest', component:NeedRequestsComponent },
    { path: 'addNeedRequest', component:AddNeedRequestComponent  },
    { path: 'editNeedRequest/:id', component:EditneedRequestComponent },
    { path: 'Categories', component:CategoryComponent  },
    { path: 'addCategory', component:AddCategoryComponent  },
    { path: 'editCategory/:id', component:EditCategoryComponent },
    { path: 'SubCategories', component:SubCategoryComponent  },
    { path: 'addSubCategory', component:AddSubCategoryComponent  },
    { path: 'editSubCategory/:id', component:EditSubCategoryComponent },
    {path:'NeedRequestEmp',component:DisplayNeedRequestEmpComponent},
    {path:'AddNeedRequestEmp',component:AddNeedRequestEmpComponent},
    {path:'EditNeedRequestEmp/:id',component:EditNeedRequestEmpComponent},
    {path:'EvaluationType',component:EvaluationTypeComponent},
    {path:'AddEvaluationType',component:AddEvaluationTypeComponent},
    {path:'EditEvaluationType/:id',component:EditEvaluationTypeComponent},
    {path:'EvaluationsProfession',component:EvaluationProfessionComponent},
    {path:'AddEvaluationProfession',component:AddEvaluationProfessionComponent},
    {path:'EditEvaluationProfession/:id',component:EditEvaluationProfessionComponent},
    {path:'Evaluations',component:DisplayEvaluationsComponent},
    {path:'AddEvaluation',component:AddEvaluationComponent},
    {path:'EditEvaluation/:id',component:EditEvaluationComponent},
    {path:'Certificates',component:CertificateComponent},
    {path:'AddCertificates',component:AddCertificatesComponent},
    {path:'EditCertificates/:id',component:EditCertificatesComponent},
    {path:'TrainingTypes',component:TrainingTypeComponent},
    {path:'AddTrainingTypes',component:AddTrainingTypeComponent},
    {path:'EditTrainingTypes/:id',component:EditTrainingTypeComponent},
    {path:'Courses',component:CoursesComponent},
    {path:'AddCourse',component:AddCourseComponent},
    {path:'EditCourse/:id',component:EditCourseComponent},
    {path:'TrainingProfessions',component:TrainingProfessionComponent},
    {path:'AddTrainingProfession',component:AddTrainingProfessionComponent},
    {path:'EditTrainingProfession/:id',component:EditTrainingProfessionComponent},
    {path:'Trainings',component:TrainingsComponent},
    {path:'AddTraining',component:AddTrainingComponent},
    {path:'EditTraining/:id',component:EditTrainingComponent},
    {path:'RequestTraining',component:RequestTrainingComponent},
    {path:'AddRequestTraining',component:AddRequestTrainingComponent},
    {path:'EditRequestTraining/:id',component:EditRequestTrainingComponent},
    {path:'LeavesType',component:LeavesTypeComponent},
    {path:'AddLeavesType',component:AddLeavesTypeComponent},
    {path:'EditLeavesType/:id',component:EditLeavesTypeComponent},
    {path:'Instructor',component:InstructorComponent},
    {path:'AddInstructor',component:AddInstructorComponent},
    {path:'EditInstructor/:id',component:EditInstructorComponent},
    {path:'DisplayPositionLevels',component:DisplayPositionLevelsComponent},
    {path:'DisplayPositions',component:DisplayAllPositionsComponent},
    {path:'DisplayProfessions',component:DisplayProfessionsComponent},
    {path:'DisplayUniversities',component:DisplayUniversitiesComponent},
    {path:'DisplayFaculties',component:DisplayFacultiesComponent},
    {path:'DisplayFacultydepartments',component:DisplayFacultydepartmentsComponent},
    {path:'PieCharts',component:PieChartsComponent},
    {path:'ReportExcuse',component:ReportExcuseComponent},
    {path:'ReportLeave',component:ReportLeavesComponent},
    {path:'EmployeeFullReport',component:EmployeeFullReportComponent},
    {path:'ReportAttendance',component:ReportAttendanceComponent},







   ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

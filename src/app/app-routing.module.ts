import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { Child1Component } from './main/child1/child1.component';
import { AddEmployeeComponent } from './Employee/add-employee/add-employee.component';
import { AddProfessionComponent } from './Profession/add-profession/add-profession.component';
import { DisplayAllEmployeesComponent } from './Employee/display-all-employees/display-all-employees.component';
import { EditEmployeeComponent } from './Employee/edit-employee/edit-employee.component';
import { AddExcuseComponent } from './Excuse/add-excuse/add-excuse.component';
import {AuthGuard} from 'src/app/Guards/auth.guard'
import {AdminGuard} from 'src/app/Guards/admin.guard'
import { from } from 'rxjs';
import { PreviosExcuseComponent } from './Excuse/previos-excuse/previos-excuse.component';
import { AllExcusesComponent } from './Excuse/all-excuses/all-excuses.component';
import { AddLeaveComponent } from './Leaves/add-leave/add-leave.component';
import { PreviousLeavesComponent } from './Leaves/previous-leaves/previous-leaves.component';
import { AllLeavesComponent } from './Leaves/all-leaves/all-leaves.component';
import { AllUsersComponent } from './Users/all-users/all-users.component';
import { ChangePasswordComponent } from './Auth/change-password/change-password.component';
import { AttendanceOUTComponent } from './attendance/attendance-out/attendance-out.component';
import { AttendanceINComponent } from './attendance/attendance-in/attendance-in.component';
import { NeedRequestsComponent } from './NeedRequest/need-requests/need-requests.component';
import { AddNeedRequestComponent } from './NeedRequest/add-need-request/add-need-request.component';
import { EditneedRequestComponent } from './NeedRequest/editneed-request/editneed-request.component';
import{ CategoryComponent } from './Categories/category/category.component';
import { EditCategoryComponent } from './Categories/edit-category/edit-category.component';
import { AddCategoryComponent } from './Categories/add-category/add-category.component';
import { SubCategoryComponent } from './SubCategories/sub-category/sub-category.component';
import { AddSubCategoryComponent } from './SubCategories/add-sub-category/add-sub-category.component';
import { EditSubCategoryComponent } from './SubCategories/edit-sub-category/edit-sub-category.component';
import { DisplayNeedRequestEmpComponent } from './NeedRequestEmployee/display-need-request-emp/display-need-request-emp.component';
import { AddNeedRequestEmpComponent } from './NeedRequestEmployee/add-need-request-emp/add-need-request-emp.component';
import { EvaluationTypeComponent } from './Evaluations/evaluation-type/evaluation-type.component';
import { AddEvaluationTypeComponent } from './Evaluations/add-evaluation-type/add-evaluation-type.component';
import { EditEvaluationTypeComponent } from './Evaluations/edit-evaluation-type/edit-evaluation-type.component';
import { EvaluationProfessionComponent } from './Evaluations/evaluation-profession/evaluation-profession.component';
import { EditEvaluationProfessionComponent } from './Evaluations/edit-evaluation-profession/edit-evaluation-profession.component';
import { AddEvaluationProfessionComponent } from './Evaluations/add-evaluation-profession/add-evaluation-profession.component';
import { EditNeedRequestEmpComponent } from './NeedRequestEmployee/edit-need-request-emp/edit-need-request-emp.component';
import { DisplayEvaluationsComponent } from './Evaluations/display-evaluations/display-evaluations.component';
import { AddEvaluationComponent } from './Evaluations/add-evaluation/add-evaluation.component';
import { EditEvaluationComponent } from './Evaluations/edit-evaluation/edit-evaluation.component';
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
import { RequestTrainingComponent } from './Training/request-training/request-training.component';
import { AddRequestTrainingComponent } from './Training/add-request-training/add-request-training.component';
import { EditRequestTrainingComponent } from './Training/edit-request-training/edit-request-training.component';
import { LeavesTypeComponent } from './Leaves/leaves-type/leaves-type.component';
import { AddLeavesTypeComponent } from './Leaves/add-leaves-type/add-leaves-type.component';
import { EditLeavesTypeComponent } from './Leaves/edit-leaves-type/edit-leaves-type.component';
import { InstructorComponent } from './Instructors/instructor/instructor.component';
import { AddInstructorComponent } from './Instructors/add-instructor/add-instructor.component';
import { EditInstructorComponent } from './Instructors/edit-instructor/edit-instructor.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProfileComponent } from './Auth/profile/profile.component';

const routes: Routes = [
  {path:'Register' , component:RegisterComponent  },
  {path:'login',component:LoginComponent},
  { path: 'changPaswword', component:ChangePasswordComponent },
  {path:'',component:SideNavComponent,canActivate:[AuthGuard] ,children: [
    { path: 'employee', component:DisplayAllEmployeesComponent,canActivate:[AdminGuard] },
    { path: 'addemployee', component:AddEmployeeComponent },
    { path: 'mainPage', component:MainPageComponent },
    {path:'Profile',component:ProfileComponent},
    { path: 'profession', component:AddProfessionComponent},
    { path: 'editEmployee/:empId', component:EditEmployeeComponent },
    { path: 'AddExcuse', component:AddExcuseComponent,canActivate:[AuthGuard] },
    { path: 'previousExcuse', component:PreviosExcuseComponent,canActivate:[AuthGuard] },
    { path: 'AllExcuses', component:AllExcusesComponent},
    { path: 'AddLeave', component:AddLeaveComponent,canActivate:[AuthGuard] },
    { path: 'previousLeave', component:PreviousLeavesComponent,canActivate:[AuthGuard] },
    { path: 'AllLeaves', component:AllLeavesComponent,canActivate:[AuthGuard,AdminGuard] },
    { path: 'AllLUsers', component:AllUsersComponent,canActivate:[AuthGuard,AdminGuard] },
    { path: 'attendanceIN', component:AttendanceINComponent,canActivate:[AuthGuard,AdminGuard] },
    { path: 'attendanceout', component:AttendanceOUTComponent,canActivate:[AuthGuard,AdminGuard] },
    { path: 'NeedRequest', component:NeedRequestsComponent,canActivate:[AuthGuard] },
    { path: 'addNeedRequest', component:AddNeedRequestComponent ,canActivate:[AuthGuard] },
    { path: 'editNeedRequest/:id', component:EditneedRequestComponent,canActivate:[AuthGuard,AdminGuard]  },
    { path: 'Categories', component:CategoryComponent ,canActivate:[AuthGuard,AdminGuard] },
    { path: 'addCategory', component:AddCategoryComponent ,canActivate:[AuthGuard,AdminGuard] },
    { path: 'editCategory/:id', component:EditCategoryComponent ,canActivate:[AuthGuard,AdminGuard] },
    { path: 'SubCategories', component:SubCategoryComponent ,canActivate:[AuthGuard,AdminGuard] },
    { path: 'addSubCategory', component:AddSubCategoryComponent ,canActivate:[AuthGuard,AdminGuard] },
    { path: 'editSubCategory/:id', component:EditSubCategoryComponent ,canActivate:[AuthGuard,AdminGuard] },
    {path:'NeedRequestEmp',component:DisplayNeedRequestEmpComponent},
    {path:'AddNeedRequestEmp',component:AddNeedRequestEmpComponent},
    {path:'EditNeedRequestEmp/:id',component:EditNeedRequestEmpComponent},
    {path:'EvaluationType',component:EvaluationTypeComponent,canActivate:[AuthGuard,AdminGuard]},
    {path:'AddEvaluationType',component:AddEvaluationTypeComponent,canActivate:[AuthGuard,AdminGuard]},
    {path:'EditEvaluationType/:id',component:EditEvaluationTypeComponent,canActivate:[AuthGuard,AdminGuard]},
    {path:'EvaluationsProfession',component:EvaluationProfessionComponent,canActivate:[AuthGuard,AdminGuard]},
    {path:'AddEvaluationProfession',component:AddEvaluationProfessionComponent,canActivate:[AuthGuard,AdminGuard]},
    {path:'EditEvaluationProfession/:id',component:EditEvaluationProfessionComponent,canActivate:[AuthGuard,AdminGuard]},
    {path:'Evaluations',component:DisplayEvaluationsComponent,canActivate:[AuthGuard,AdminGuard]},
    {path:'AddEvaluation',component:AddEvaluationComponent,canActivate:[AuthGuard,AdminGuard]},
    {path:'EditEvaluation/:id',component:EditEvaluationComponent,canActivate:[AuthGuard,AdminGuard]},
    {path:'Certificates',component:CertificateComponent,canActivate:[AuthGuard,AdminGuard]},
    {path:'AddCertificates',component:AddCertificatesComponent,canActivate:[AuthGuard,AdminGuard]},
    {path:'EditCertificates/:id',component:EditCertificatesComponent,canActivate:[AuthGuard,AdminGuard]},
    {path:'TrainingTypes',component:TrainingTypeComponent,canActivate:[AuthGuard,AdminGuard]},
    {path:'AddTrainingTypes',component:AddTrainingTypeComponent,canActivate:[AuthGuard,AdminGuard]},
    {path:'EditTrainingTypes/:id',component:EditTrainingTypeComponent,canActivate:[AuthGuard,AdminGuard]},
    {path:'Courses',component:CoursesComponent,canActivate:[AuthGuard,AdminGuard]},
    {path:'AddCourse',component:AddCourseComponent,canActivate:[AuthGuard,AdminGuard]},
    {path:'EditCourse/:id',component:EditCourseComponent,canActivate:[AuthGuard,AdminGuard]},
    {path:'TrainingProfessions',component:TrainingProfessionComponent,canActivate:[AuthGuard,AdminGuard]},
    {path:'AddTrainingProfession',component:AddTrainingProfessionComponent,canActivate:[AuthGuard,AdminGuard]},
    {path:'EditTrainingProfession/:id',component:EditTrainingProfessionComponent,canActivate:[AuthGuard,AdminGuard]},
    {path:'Trainings',component:TrainingsComponent,canActivate:[AuthGuard,AdminGuard]},
    {path:'AddTraining',component:AddTrainingComponent,canActivate:[AuthGuard,AdminGuard]},
    {path:'EditTraining/:id',component:EditTrainingComponent,canActivate:[AuthGuard,AdminGuard]},
    {path:'RequestTraining',component:RequestTrainingComponent},
    {path:'AddRequestTraining',component:AddRequestTrainingComponent},
    {path:'EditRequestTraining/:id',component:EditRequestTrainingComponent},
    {path:'LeavesType',component:LeavesTypeComponent},
    {path:'AddLeavesType',component:AddLeavesTypeComponent},
    {path:'EditLeavesType/:id',component:EditLeavesTypeComponent},
    {path:'Instructor',component:InstructorComponent},
    {path:'AddInstructor',component:AddInstructorComponent},
    {path:'EditInstructor/:id',component:EditInstructorComponent},
   ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

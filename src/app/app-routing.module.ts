import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { Child1Component } from './main/child1/child1.component';
import { AddEmployeeComponent } from './Employee/add-employee/add-employee.component';
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
import { DisplayPositionLevelsComponent } from './PositionLevel/display-position-levels/display-position-levels.component';
import { DisplayAllPositionsComponent } from './Positions/display-all-positions/display-all-positions.component';
import { DisplayProfessionsComponent } from './Profession/display-professions/display-professions.component';
import { DisplayUniversitiesComponent } from './Universities/display-universities/display-universities.component';
import { DisplayFacultiesComponent } from './Faculties/display-faculties/display-faculties.component';
import { DisplayFacultydepartmentsComponent } from './FacultyDepartments/display-facultydepartments/display-facultydepartments.component';
import { EditLeaveRequestComponent } from './Leaves/edit-leave-request/edit-leave-request.component';


const routes: Routes = [
  {path:'Register' , component:RegisterComponent  },
  {path:'login',component:LoginComponent},
  { path: 'changPaswword', component:ChangePasswordComponent },
  {path:'',component:SideNavComponent,canActivate:[AuthGuard] ,children: [
    { path: 'employee', component:DisplayAllEmployeesComponent },
    // ,canActivate:[AdminGuard]
    { path: 'addemployee', component:AddEmployeeComponent },
    { path: 'mainPage', component:MainPageComponent },
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



   ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path : '', component : AppComponent, canActivate : [AuthGuard], // 로그인 한경우
    children : [
      {path : '', component : DashboardComponent}
    ]
  },
  {path : '', component : AppComponent, canActivate : [AuthGuard, AdminRoleGuard], // admin 계정
    children : [
      {path : 'pack', component : RecruitListComponent}
      , {path : 'recruitForm', component : RecruitFormComponent}
      , {path : 'recruitForm/:id', component : RecruitFormComponent}
      , {path : 'admin-list', component : AdminListComponent}
      , {path : 'qna/list', component : QnaListComponent}
      , {path : 'qna/view/:qnaIdx', component : QnaViewComponent}
      , {path : 'preview/:id', component : RecruitFormPreviewComponent}
    ]
  },
  {path : '', component : AppComponent, canActivate : [AuthGuard, ExaminantRoleGuard], // examinant 계정
    children : [
      {path : 'recruit-evaluation', component : RecruitExaminantComponent},
      {path : 'recruit-evaluation/:recruitPage', component : RecruitExaminantComponent},
      {path : 'recruit-evaluation/:recruitPage/:recruitId/:applicantPage', component : RecruitExaminantComponent},
      {path : "resume/:resumeId", component : EvaluationApplicantComponent}
    ]
  },
  {path : '', component : PullpageComponent,
    children : [
      {path : 'login', component : LoginComponent},
      {path : 'resume/:resumeId/print', component : ResumePrintComponent}
    ]
  },
  {path : '', component : AppComponent, canActivate : [AuthGuard],
    children : [
      {path : 'access-denied', component : AccessDeniedComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

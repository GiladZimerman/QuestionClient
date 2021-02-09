import { NgModule } from '@angular/core';
import { LoginComponent } from "./Components/login/login.component";
import { QuestionListComponent } from "./Components/question-list/question-list.component";
import { RouterModule, Routes } from '@angular/router';
import { ChartsComponent } from './Components/charts/charts.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginGuardGuard } from './guards/login-guard.guard';

const routes: Routes = [
  {
    path: "", component: LoginComponent
  },
  {
    path: '**', redirectTo: "home/question-list"
  },
  {
    path: "home", component: HomeComponent, children: [
      { path: "", redirectTo: 'question-list', pathMatch: 'full' },
      { path: "question-list", component: QuestionListComponent },
      { path: "charts", component: ChartsComponent }
    ],
    canActivate: [LoginGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

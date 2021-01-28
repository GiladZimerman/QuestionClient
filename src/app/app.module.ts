import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QuestionListComponent } from './Components/question-list/question-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AddQuestionComponent } from './Components/add-question/add-question.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { he_IL } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import he from '@angular/common/locales/he';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { EditQuestionComponent } from './Components/edit-question/edit-question.component';
import { ShowQuestionComponent } from './Components/show-question/show-question.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './Components/login/login.component';
import { ChartsComponent } from './Components/charts/charts.component';
import { NzModalModule } from 'ng-zorro-antd/modal'
import { RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { QuestionDataComponent } from './Components/question-data/question-data.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'


registerLocaleData(he);

@NgModule({
  declarations: [
    AppComponent,
    QuestionListComponent,
    AddQuestionComponent,
    EditQuestionComponent,
    ShowQuestionComponent,
    LoginComponent,
    ChartsComponent,
    HomeComponent,
    QuestionDataComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzDrawerModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzIconModule,
    NzMessageModule,
    NzMenuModule,
    NzDropDownModule,
    AppRoutingModule,
    NzModalModule,
    RouterModule,
    NzDatePickerModule
  ],
  providers: [{ provide: NZ_I18N, useValue: he_IL }],
  bootstrap: [AppComponent]
})
export class AppModule { }

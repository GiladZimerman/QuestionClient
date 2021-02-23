import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QuestionListComponent } from './Components/question-list/question-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
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
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './Components/login/login.component';
import { ChartsComponent } from './Components/charts/charts.component';
import { NzModalModule } from 'ng-zorro-antd/modal'
import { RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { QuestionDataComponent } from './Components/question-data/question-data.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { XychartComponent } from './Components/charts/xychart/xychart.component';
import { PiechartComponent } from './Components/charts/piechart/piechart.component';
import { IdPipe } from './pipes/id.pipe'
import { CustomHttpInterceptor } from './custom-http-interceptor';
import { TreeComponent } from './Components/tree/tree.component';
import { NodeComponent } from './Components/tree/node/node.component';
import { StoreModule } from '@ngrx/store';
import { QuestionReducer } from './Services/store/question.reducer';
import { EffectsModule } from '@ngrx/effects';
import { QuestionsEffects } from './Services/effects/questions.effcts';


registerLocaleData(he);

@NgModule({
  declarations: [
    AppComponent,
    QuestionListComponent,
    LoginComponent,
    ChartsComponent,
    HomeComponent,
    QuestionDataComponent,
    XychartComponent,
    PiechartComponent,
    IdPipe,
    TreeComponent,
    NodeComponent,

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
    NzDatePickerModule,
    StoreModule.forRoot({ questionList: QuestionReducer }, {}),
    EffectsModule.forRoot([QuestionsEffects]),
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

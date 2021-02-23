import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { QuestionService } from "../../Services/question.service";
import { IQuestion } from "src/app/Models/IQuestion.model";
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromQuestionList from '../../Services/store/question.reducer';
import * as QuestionListActions from '../../Services/store/question.actions';


@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit, OnDestroy {
  questions: IQuestion[];
  tempLoading$: Observable<boolean>;
  tempError$: Observable<Error>;
  questionsDuplicate: IQuestion[];
  question: IQuestion;
  private subs: Subscription[] = [];
  fillter: string // hold the search string
  visibleData = false; // when true the side bar is visible
  readOnly = false; // when true the side bar is in readonly when false its in edit mode


  constructor(private service: QuestionService,
    private route: Router,
    private Model: NzModalService,
    private store: Store<fromQuestionList.AppState>) { }


  ngOnInit(): void {
    this.store.select(store => store.questionList.Questions).subscribe(data => {
      this.questions = data;
      this.questionsDuplicate = data;

    })
    this.tempLoading$ = this.store.select(store => store.questionList.loading);
    this.tempError$ = this.store.select(store => store.questionList.error);

    this.store.dispatch(new QuestionListActions.LoadQuestionsAction());
    // this.subs.push(this.service.questionSubject.subscribe(data => {
    //   if (data) {
    //     this.questions = data;
    //     this.questionsDuplicate = data;
    //   }
    // }));
  }


  ngOnDestroy() {
    this.subs.forEach(item => {
      item.unsubscribe();
    });
  }


  onQuestionClicked(question: IQuestion) {
    this.question = question;
    this.openView();
  }

  //opens the side-bar in edit mode
  openAdd(): void {
    this.readOnly = false;
    this.visibleData = true;
  }

  //close the side-bar
  closeAdd(): void {
    this.visibleData = false;
  }


  questionDelete(id: string): void {
    let q = this.questions.find(q => q.id === id);
    this.Model.confirm({
      nzTitle: `Are you sure delete question: ${q.name}`,
      nzContent: `Description: ${q.description}`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.store.dispatch(new QuestionListActions.DeleteQuestionAction(q))
      },
      nzCancelText: 'No',
      nzOnCancel: () => { }
    });
  }

  //opens the side-bar in edit mode
  openEdit(qid: string): void {
    this.readOnly = false;
    this.question = this.questions.find(q => q.id === qid)
    this.visibleData = true
  }

  //opens the side-bar in readonly
  openView(): void {
    this.readOnly = true;
    this.visibleData = true;
  }


  sortBy(type: string) {
    if (type === "name") {
      this.questions.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (b.name > a.name) {
          return -1;
        }
      });
    }
    else if (type === "date") {
      this.questions.sort((a, b) => {
        if (a.creationDate > b.creationDate)
          return -1;
        if (b.creationDate > a.creationDate)
          return 1;
      });
    }
  }


  search() {
    this.questions = this.questionsDuplicate.filter(q => q.name.toLowerCase().includes(this.fillter.toLowerCase()));
  }
}

import { Component, OnInit, Output } from '@angular/core';
import { QuestionService } from "../../Services/question.service";
import { Question } from "src/app/Models/Question.model";
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  questions: Question[];
  questionsduplicate: Question[];
  question: Question = new Question();
  Fillter: string
  VisibleData = false;
  readonly = false;
  constructor(private service: QuestionService, private route: Router, private Model: NzModalService) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") !== null) {
      this.service.questionSubject.subscribe(data => {
        this.questions = data
        this.questionsduplicate = data
      });
      this.service.getallQuestions();
    }
    else {
      this.route.navigate([""]);
    }
  }
  onQuestionClicked(question: Question) {
    this.question = question;
    this.openView();
  }


  openAdd(): void {
    this.VisibleData = true
  }


  closeAdd(): void {
    this.VisibleData = false;
  }


  questionDelete(id: string): void {
    let q = this.questions.find(q => q.id === id);
    this.Model.confirm({
      nzTitle: `Are you sure delete question: ${q.name}`,
      nzContent: `Description: ${q.description}`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.service.deleteQuestion(id),
      nzCancelText: 'No',
      nzOnCancel: () => { }

    });
  }
  openEdit(qid: string): void {
    this.readonly = false;
    this.question = this.questions.find(q => q.id === qid)
    this.VisibleData = true
  }
  openView(): void {
    this.readonly = true;
    this.VisibleData = true;
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
    this.questions = this.questionsduplicate.filter(q => q.name.toLowerCase().includes(this.Fillter.toLowerCase()));
  }
}

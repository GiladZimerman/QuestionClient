import { IQuestion } from "src/app/Models/IQuestion.model"
import { BehaviorSubject, Subject } from "rxjs"
import { Injectable, OnInit } from "@angular/core";
import { HttpService } from "./http.service";
import { NzMessageService } from "ng-zorro-antd/message";


@Injectable({
  providedIn: 'root'
})

export class QuestionService implements OnInit {
  questions: IQuestion[]
  question: IQuestion
  currentquestionSubject: Subject<IQuestion> = new Subject<IQuestion>();
  questionSubject: BehaviorSubject<IQuestion[]> = new BehaviorSubject<IQuestion[]>(undefined);
  constructor(private http: HttpService, private message: NzMessageService) {
    this.getallQuestions();
  }


  ngOnInit() { }


  getallQuestions() {
    this.http.getallQuestions().subscribe(data => {
      this.questions = data["questions"];
      this.questionSubject.next(this.questions);
    });

  }
  getQuestion(qid: string): IQuestion {
    this.http.getQuestion(qid).subscribe(data => {
      return data["qa"];
    })
    return
  }

  addQuestion(question: IQuestion) {
    this.http.addQuestion(question).subscribe(data => {
      console.log(data);
      this.message.success(data["message"]);
      this.questions.push(data["qa"]);
      this.questionSubject.next(this.questions);
    }, error => {
      this.message.error(error["message"]);
    });
  }

  deleteQuestion(id: string) {
    this.http.deleteQuestion(id).subscribe(data => {
      this.message.success(data["message"]);
      this.getallQuestions();
    }, error => {
      this.message.error(error["message"]);
    });
  }

  editQuestion(id: string, newQuestion: IQuestion) {
    this.http.editQuestion(id, newQuestion).subscribe(data => {
      this.getallQuestions();
      this.message.success("Question was edited");
    }, error => {
      this.message.error("Error editing question");
    })
  }
}

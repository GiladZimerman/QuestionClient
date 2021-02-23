import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IQuestion } from 'src/app/Models/IQuestion.model';
import { QuestionService } from 'src/app/Services/question.service';
import * as fromQuestionList from '../../Services/store/question.reducer';
import * as QuestionListActions from '../../Services/store/question.actions'

@Component({
  selector: 'app-question-data',
  templateUrl: './question-data.component.html',
  styleUrls: ['./question-data.component.css']
})
export class QuestionDataComponent implements OnInit {

  QuestionForm: FormGroup;
  @Input() currentQuestion: IQuestion
  @Input() isReadOnly: boolean = false;
  @Output() AddEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() CancelEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private service: QuestionService, private store: Store<fromQuestionList.AppState>) { }

  ngOnInit(): void {
    this.QuestionForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      creationDate: new FormControl('')
    });
  }

  onAddSubmit(): void {
    if (this.QuestionForm.valid) {
      for (const key in this.QuestionForm.controls) {
        this.QuestionForm.controls[key].markAsDirty();
        this.QuestionForm.controls[key].updateValueAndValidity();
      }
      if (!this.currentQuestion?.id) {
        this.QuestionForm.controls['creationDate'].setValue(new Date());
        this.store.dispatch(new QuestionListActions.AddQuestionAction(this.QuestionForm.value));
        //this.service.addQuestion(this.QuestionForm.value);
        this.QuestionForm.reset();
      }
      else {
        this.QuestionForm.controls['creationDate'].setValue(this.currentQuestion.creationDate);
        this.store.dispatch(new QuestionListActions.UpdateQuestionAction({ id: this.currentQuestion.id, Question: this.QuestionForm.value }))
        //this.service.editQuestion(this.currentQuestion.id, this.QuestionForm.value);
        this.QuestionForm.reset();
        this.currentQuestion = null;
      }
    }
    this.AddEvent.emit(true);
  }

  cancelClick(e: MouseEvent): void {
    e.preventDefault();
    this.QuestionForm.reset();
    this.CancelEvent.emit(true);
  }

}

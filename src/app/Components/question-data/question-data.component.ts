import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/Models/Question.model';
import { QuestionService } from 'src/app/Services/question.service';

@Component({
  selector: 'app-question-data',
  templateUrl: './question-data.component.html',
  styleUrls: ['./question-data.component.css']
})
export class QuestionDataComponent implements OnInit {

  QuestionForm: FormGroup;
  @Input() currentQuestion: Question
  @Input() isReadOnly: boolean = false;
  @Output() AddEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() CancelEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private service: QuestionService) { }

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
        this.service.addQuestion(this.QuestionForm.value);
        this.QuestionForm.reset();
      }
      else {
        this.QuestionForm.controls['creationDate'].setValue(this.currentQuestion.creationDate);
        this.service.editQuestion(this.currentQuestion.id, this.QuestionForm.value);
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

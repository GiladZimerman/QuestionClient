import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IQuestion } from 'src/app/Models/IQuestion.model';
import { QuestionService } from '../../Services/question.service';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {
  editQuestionForm: FormGroup;
  @Input() currentQuestion: IQuestion
  @Output() CancelEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private service: QuestionService) { }

  ngOnInit(): void {
    this.editQuestionForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }
  onEditubmit(): void {
    if (this.editQuestionForm.valid) {
      for (const key in this.editQuestionForm.controls) {
        this.editQuestionForm.controls[key].markAsDirty();
        this.editQuestionForm.controls[key].updateValueAndValidity();
      }
      this.service.editQuestion(this.currentQuestion.id, this.editQuestionForm.value);
      this.editQuestionForm.reset();

    }
  }
  cancelClick(e: MouseEvent) {
    e.preventDefault();
    this.editQuestionForm.reset();
    this.CancelEvent.emit(true);
  }
}

import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from "../../Services/question.service"
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  newQuestionForm: FormGroup;



  constructor(private service: QuestionService) { }
  @Output() AddEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() CancelEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  ngOnInit(): void {

    this.newQuestionForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      creationDate: new FormControl('')
    });
  }
  onAddSubmit(): void {
    if (this.newQuestionForm.valid) {
      for (const key in this.newQuestionForm.controls) {
        this.newQuestionForm.controls[key].markAsDirty();
        this.newQuestionForm.controls[key].updateValueAndValidity();
      }
      this.newQuestionForm.controls['creationDate'].setValue(new Date());
      this.service.addQuestion(this.newQuestionForm.value);
      this.newQuestionForm.reset();
      this.AddEvent.emit(true);
    }
  }
  cancelClick(e: MouseEvent): void {
    e.preventDefault();
    this.newQuestionForm.reset();
    this.CancelEvent.emit(true);
  }


}

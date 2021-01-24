import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from 'src/app/Models/Question.model';

@Component({
  selector: 'app-show-question',
  templateUrl: './show-question.component.html',
  styleUrls: ['./show-question.component.css']
})
export class ShowQuestionComponent implements OnInit {

  @Output() CancelEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }
  @Input() currentQuestion: Question
  ngOnInit(): void {
  }
  cancelClick() {
    this.CancelEvent.emit(true);
  }
}

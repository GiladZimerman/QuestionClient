import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IQuestion } from 'src/app/Models/IQuestion.model';

@Component({
  selector: 'app-show-question',
  templateUrl: './show-question.component.html',
  styleUrls: ['./show-question.component.css']
})
export class ShowQuestionComponent implements OnInit {

  @Output() CancelEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }
  @Input() currentQuestion: IQuestion
  ngOnInit(): void {
  }
  cancelClick() {
    this.CancelEvent.emit(true);
  }
}

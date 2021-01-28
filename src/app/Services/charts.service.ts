import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Question } from "../Models/Question.model";
import { QuestionService } from "./question.service";

@Injectable({
  providedIn: 'root'
})

export class ChartsService implements OnInit {
  data = [{
    "Day": "Sunday",
    "sum": 0
  },
  {
    "Day": "Monday",
    "sum": 0
  },
  {
    "Day": "Tuesday",
    "sum": 0
  },
  {
    "Day": "Wednesday",
    "sum": 0
  },
  {
    "Day": "Thursday",
    "sum": 0
  },
  {
    "Day": "Friday",
    "sum": 0
  },
  {
    "Day": "Saturday",
    "sum": 0
  },]
  question: Question[];
  datasubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(undefined);
  houressubject: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(undefined);
  hoursarr: number[] = [];

  constructor(private questionService: QuestionService) {
    this.questionService.questionSubject.subscribe(data => {
      if (data) {
        this.question = data;
        this.chartinfo();
        this.datasubject.next(this.data);
        this.houressubject.next(this.hoursarr);
      }
    })
  }
  ngOnInit() { }

  chartinfo() {
    this.question.forEach(q => {
      let CurrentDate = new Date(q.creationDate);
      let time = CurrentDate.getHours();
      let day = CurrentDate.getDay();
      this.data[day][time] ? this.data[day][time] += 1 : this.data[day][time] = 1;
      this.data[day].sum++;
      if (!this.hoursarr.includes(time)) {
        this.hoursarr.push(time);
      }
    });
    this.datasubject.next(this.data);
    this.houressubject.next(this.hoursarr);
  }
}

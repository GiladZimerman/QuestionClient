import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IQuestion } from "../Models/IQuestion.model";
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
  question: IQuestion[];
  questionOrigin: IQuestion[];
  dateRange: Date[];
  dateRangeSub: BehaviorSubject<Date[]> = new BehaviorSubject<Date[]>(undefined);
  datasubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(undefined);
  houressubject: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(undefined);
  hoursarr: number[] = [];
  hoursdic = new Map();

  constructor(private questionService: QuestionService) {
    this.questionService.questionSubject.subscribe(data => {
      if (data) {
        this.question = data;
        this.questionOrigin = data;
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
      if (!this.hoursdic.get(time)) {
        this.hoursarr.push(time);
        this.hoursdic.set(time, 1);
      }
      else {
        let temp = this.hoursdic.get(time);
        temp++;
        this.hoursdic.set(time, temp);
      }
    });
    this.houressubject.next(this.hoursarr);
    this.datasubject.next(this.data);
  }

  getPopularHoures() {
    var mapAsc = new Map([...this.hoursdic.entries()].sort((a, b) => b[1] - a[1]));
    this.hoursarr = [];
    for (const iterator of mapAsc.keys()) {
      this.hoursarr.push(iterator);
    }
    let popularhoures: any[] = this.hoursarr.slice(0, 5);
    if (popularhoures.length === 5) {
      popularhoures.push("others");
      this.question.forEach(q => {
        let CurrentDate = new Date(q.creationDate);
        let time = CurrentDate.getHours();
        let day = CurrentDate.getDay();
        if (!popularhoures.includes(time)) {
          this.data[day]["others"] ? this.data[day]["others"]++ : this.data[day]["others"] = 1;
        }
      });
    }
    return popularhoures;
  }

  questionDateRange(res: Date[]) {
    if (res?.length === 2) {
      this.resetData();
      this.hoursdic.clear();
      this.hoursarr = [];
      this.question = this.questionOrigin?.filter(q => new Date(q.creationDate) >= res[0] && new Date(q.creationDate) <= res[1]);
    }
    else {
      this.resetData();
      this.hoursdic.clear();
      this.hoursarr = [];
      this.question = this.questionService.questions;
    }
    this.chartinfo();
  }

  resetData() {
    this.data = [{
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
  }

}

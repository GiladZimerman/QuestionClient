import { HttpClient } from "@angular/common/http";
import { IQuestion } from "src/app/Models/IQuestion.model"
import { Observable } from "rxjs"
import { Injectable } from "@angular/core";
import { IUser } from "../Models/IUser.model";
import { environment } from "../../environments/environment"
import { delay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  constructor(private http: HttpClient) { }


  getallQuestions() {
    return this.http.get<IQuestion[]>(`${environment.baseurl}/qa`);

  }


  getQuestion(qid: string) {
    return this.http.get<IQuestion>(`${environment.baseurl}/qa/${qid}`);

  }


  addQuestion(question: IQuestion): Observable<object> {
    return this.http.post(`${environment.baseurl}/qa/create`, question);
  }


  deleteQuestion(id: string): Observable<object> {
    return this.http.delete(`${environment.baseurl}/qa/delete/${id}`);
  }


  editQuestion(id: string, newQuestion: IQuestion): Observable<object> {
    return this.http.put(`${environment.baseurl}/qa/update/${id}`, newQuestion);
  }


  loginUser(user: IUser): Observable<object> {
    return this.http.post(`${environment.baseurl}/auth/login`, user);
  }
}

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Question } from "src/app/Models/Question.model"
import { Observable } from "rxjs"
import { Injectable } from "@angular/core";
import { User } from "../Models/User.model";

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private baseurl = "http://localhost:3000";
  headers = () => new HttpHeaders({ "authorization": localStorage.getItem("token") });
  constructor(private http: HttpClient) {
  }
  getallQuestions(): Observable<object> {
    return this.http.get(`${this.baseurl}/qa`, { headers: this.headers() });

  }


  getQuestion(qid: string): Observable<object> {
    return this.http.get(`${this.baseurl}/qa/${qid}`, { headers: this.headers() });

  }


  addQuestion(question: Question): Observable<object> {
    return this.http.post(`${this.baseurl}/qa/create`, question, { headers: this.headers() });
  }


  deleteQuestion(id: string): Observable<object> {
    return this.http.delete(`${this.baseurl}/qa/delete/${id}`, { headers: this.headers() });
  }


  editQuestion(id: string, newQuestion: Question): Observable<object> {
    return this.http.put(`${this.baseurl}/qa/update/${id}`, newQuestion, { headers: this.headers() });
  }


  loginUser(user: User): Observable<object> {
    return this.http.post(`${this.baseurl}/auth/login`, user);
  }
}

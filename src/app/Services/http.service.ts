import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Question } from "src/app/Models/Question.model"
import { Observable } from "rxjs"
import { Injectable } from "@angular/core";
import { User } from "../Models/User.model";
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  headers = () => new HttpHeaders({ "authorization": localStorage.getItem("token") });
  constructor(private http: HttpClient) {
  }
  getallQuestions(): Observable<object> {
    return this.http.get(`${environment.baseurl}/qa`, { headers: this.headers() });

  }


  getQuestion(qid: string): Observable<object> {
    return this.http.get(`${environment.baseurl}/qa/${qid}`, { headers: this.headers() });

  }


  addQuestion(question: Question): Observable<object> {
    return this.http.post(`${environment.baseurl}/qa/create`, question, { headers: this.headers() });
  }


  deleteQuestion(id: string): Observable<object> {
    return this.http.delete(`${environment.baseurl}/qa/delete/${id}`, { headers: this.headers() });
  }


  editQuestion(id: string, newQuestion: Question): Observable<object> {
    return this.http.put(`${environment.baseurl}/qa/update/${id}`, newQuestion, { headers: this.headers() });
  }


  loginUser(user: User): Observable<object> {
    return this.http.post(`${environment.baseurl}/auth/login`, user);
  }
}

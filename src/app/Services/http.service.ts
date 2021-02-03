import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IQuestion } from "src/app/Models/IQuestion.model"
import { Observable } from "rxjs"
import { Injectable } from "@angular/core";
import { IUser } from "../Models/IUser.model";
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  headers = () => new HttpHeaders({ "authorization": localStorage.getItem("token") });

  constructor(private http: HttpClient) { }


  getallQuestions(): Observable<object> {
    return this.http.get(`${environment.baseurl}/qa`, { headers: this.headers() });

  }


  getQuestion(qid: string): Observable<object> {
    return this.http.get(`${environment.baseurl}/qa/${qid}`, { headers: this.headers() });

  }


  addQuestion(question: IQuestion): Observable<object> {
    return this.http.post(`${environment.baseurl}/qa/create`, question, { headers: this.headers() });
  }


  deleteQuestion(id: string): Observable<object> {
    return this.http.delete(`${environment.baseurl}/qa/delete/${id}`, { headers: this.headers() });
  }


  editQuestion(id: string, newQuestion: IQuestion): Observable<object> {
    return this.http.put(`${environment.baseurl}/qa/update/${id}`, newQuestion, { headers: this.headers() });
  }


  loginUser(user: IUser): Observable<object> {
    return this.http.post(`${environment.baseurl}/auth/login`, user);
  }
}

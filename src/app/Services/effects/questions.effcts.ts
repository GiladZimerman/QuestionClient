import { Actions, Effect, ofType } from "@ngrx/effects";
import * as QuestionActions from "../store/question.actions";
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of, pipe } from 'rxjs';
import { HttpService } from "../http.service";
import { Injectable } from "@angular/core";

@Injectable()
export class QuestionsEffects {

  @Effect() loadQuestions = this.actions$.pipe(
    ofType<QuestionActions.LoadQuestionsAction>(QuestionActions.LOAD_QUESTIONS),
    mergeMap(
      () => this.questionService.getallQuestions().pipe(
        map(data => {
          return new QuestionActions.LoadQuestionsSuccessAction(data['questions'])
        }),
        catchError(error => of(new QuestionActions.LoadQuestionsFailureAction(error)))
      )
    ),
  )

  @Effect() addQuestion = this.actions$.pipe(
    ofType<QuestionActions.AddQuestionAction>(QuestionActions.ADD_QUESTION),
    mergeMap(
      (data) => this.questionService.addQuestion(data.payload).pipe(
        map(res => new QuestionActions.AddQuestionSeccessAction(res['qa'])),
        catchError(error => of(new QuestionActions.AddQuestionFailureAction(error)))
      )
    )
  )

  @Effect() deleteQuestion = this.actions$.pipe(
    ofType<QuestionActions.DeleteQuestionAction>(QuestionActions.DELETE_QUESTION),
    mergeMap(
      (data) => this.questionService.deleteQuestion(data.payload.id).pipe(
        map(res => new QuestionActions.DeleteQuestionSuccessAction(res['question'])),
        catchError(error => of(new QuestionActions.DeleteQuestionFailureAction(error)))
      )
    )
  )

  @Effect() updateQuestion = this.actions$.pipe(
    ofType<QuestionActions.UpdateQuestionAction>(QuestionActions.UPDATE_QUESTION),
    mergeMap(
      data => this.questionService.editQuestion(data.payload.id, data.payload.Question).pipe(
        map(res => new QuestionActions.UpdateQuestionSuccessAction(res['newQuestion'])),
        catchError(error => of(new QuestionActions.UpdateQuestionFailureAction(error)))
      )

    )
  )

  constructor(private actions$: Actions, private questionService: HttpService) { }

}

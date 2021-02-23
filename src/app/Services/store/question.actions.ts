import { Action } from "@ngrx/store";
import { IQuestion } from "src/app/Models/IQuestion.model";

export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_QUESTIONS_SUCCESS = 'ADD_QUESTIONS_SUCCESS';
export const ADD_QUESTIONS_FAILURE = 'ADD_QUESTIONS_FAILURE';
export const LOAD_QUESTIONS = 'LOAD_QUESTIONS';
export const LOAD_QUESTIONS_SUCCESS = 'LOAD_QUESTIONS_SUCCESS';
export const LOAD_QUESTIONS_FAILURE = 'LOAD_QUESTIONS_FAILURE';
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const DELETE_QUESTIONS_SUCCESS = ' DELETE_QUESTIONS_SUCCESS';
export const DELETE_QUESTIONS_FAILURE = ' DELETE_QUESTIONS_FAILURE';
export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const UPDATE_QUESTION_SUCCESS = 'UPDATE_QUESTION_SUCCESS';
export const UPDATE_QUESTION_FAILUER = 'UPDATE_QUESTION_FAILURE';

export class AddQuestionAction implements Action {
  readonly type = ADD_QUESTION;

  constructor(public payload: IQuestion) { }
}

export class AddQuestionSeccessAction implements Action {
  readonly type = ADD_QUESTIONS_SUCCESS;
  constructor(public payload: IQuestion) { }
}

export class AddQuestionFailureAction implements Action {
  readonly type = ADD_QUESTIONS_FAILURE;
  constructor(public payload: Error) { }
}

export class LoadQuestionsAction implements Action {
  readonly type = LOAD_QUESTIONS;
}

export class LoadQuestionsSuccessAction implements Action {
  readonly type = LOAD_QUESTIONS_SUCCESS;

  constructor(public payload: IQuestion[]) { }
}

export class LoadQuestionsFailureAction implements Action {
  readonly type = LOAD_QUESTIONS_FAILURE;

  constructor(public payload: Error) { }
}

export class DeleteQuestionAction implements Action {
  readonly type = DELETE_QUESTION;

  constructor(public payload: IQuestion) { }
}
export class DeleteQuestionSuccessAction implements Action {
  readonly type = DELETE_QUESTIONS_SUCCESS;
  constructor(public payload: IQuestion) { }
}
export class DeleteQuestionFailureAction implements Action {
  readonly type = DELETE_QUESTIONS_FAILURE;
  constructor(public payload: Error) { }
}

export class UpdateQuestionAction implements Action {
  readonly type = UPDATE_QUESTION;
  constructor(public payload: { id: string, Question: IQuestion }) { }
}

export class UpdateQuestionSuccessAction implements Action {
  readonly type = UPDATE_QUESTION_SUCCESS;
  constructor(public payload: { id: string, Question: IQuestion }) { }
}

export class UpdateQuestionFailureAction implements Action {
  readonly type = UPDATE_QUESTION_FAILUER;
  constructor(public payload: Error) { }
}


export type QuestionListActions = AddQuestionAction
  | AddQuestionSeccessAction
  | AddQuestionFailureAction
  | LoadQuestionsAction
  | LoadQuestionsSuccessAction
  | LoadQuestionsFailureAction
  | DeleteQuestionAction
  | DeleteQuestionSuccessAction
  | DeleteQuestionFailureAction
  | UpdateQuestionAction
  | UpdateQuestionSuccessAction
  | UpdateQuestionFailureAction;

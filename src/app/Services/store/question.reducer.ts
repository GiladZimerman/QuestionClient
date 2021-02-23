import * as QuestionActions from "./question.actions";
import { QuestionService } from "../question.service";
import { IQuestion } from '../../Models/IQuestion.model';


export interface State {
  Questions: IQuestion[];
  loading: boolean;
  error: Error;
  currentQuestion: IQuestion;
}


export interface AppState {
  questionList: State;
}


const initialState: State = {
  Questions: [],
  currentQuestion: null,
  loading: false,
  error: undefined
};


export function QuestionReducer(state = initialState, action: QuestionActions.QuestionListActions) {
  switch (action.type) {
    case QuestionActions.ADD_QUESTION:
      return {
        ...state,
        loading: true
      };
    case QuestionActions.ADD_QUESTIONS_SUCCESS:

      return {
        ...state,
        Questions: [...state.Questions, action.payload],
        loading: false
      };
    case QuestionActions.ADD_QUESTIONS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case (QuestionActions.LOAD_QUESTIONS):
      return {
        ...state,
        loading: true
      };
    case (QuestionActions.LOAD_QUESTIONS_SUCCESS):
      return {
        ...state,
        Questions: action.payload,
        loading: false
      };
    case (QuestionActions.LOAD_QUESTIONS_FAILURE):
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case (QuestionActions.DELETE_QUESTION):
      return {
        ...state,
        loading: true
      };
    case (QuestionActions.DELETE_QUESTIONS_SUCCESS):
      return {
        ...state,
        Questions: state.Questions.filter(item => item.id !== action.payload.id),
        loading: false
      };
    case (QuestionActions.DELETE_QUESTIONS_FAILURE):
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case (QuestionActions.UPDATE_QUESTION):
      return {
        ...state,
        loading: true
      };

    case (QuestionActions.UPDATE_QUESTION_SUCCESS):
      let index = state.Questions.findIndex(q => q.id == action.payload.id);
      const question = state.Questions[index];
      const updateQuestion = {
        ...question,
        ...action.payload
      };
      const updatedquestions = [...state.Questions];
      updatedquestions[index] = updateQuestion
      return {
        ...state,
        Questions: [...updatedquestions]
      };
    case (QuestionActions.UPDATE_QUESTION_FAILUER):
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    default:
      return state;
  }
}

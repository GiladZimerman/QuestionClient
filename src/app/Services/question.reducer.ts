import { Action } from "@ngrx/store";


export function QuestionReducer(state, action: Action) {
  switch (action.type) {
    case 'getQuestion':
      return {
        ...state
      };


    default:
      break;
  }
}

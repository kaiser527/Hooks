import { CREATE_ANSWER_FOR_QUESTION_SUCCESS } from "../action/answerAction";

const INITIAL_STATE = {
  isSuccessCreate: false,
};

const answerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_ANSWER_FOR_QUESTION_SUCCESS:
      return {
        ...state,
        isSuccessCreate: true,
      };
    default:
      return state;
  }
};

export default answerReducer;

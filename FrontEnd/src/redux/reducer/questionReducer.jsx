import { CREATE_QUESTION_FOR_QUIZ_SUCCESS } from "../action/questionAction";

const INITIAL_STATE = {
  isSuccessCreate: false,
  questionData: {
    Id: 0,
  },
};

const questionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_QUESTION_FOR_QUIZ_SUCCESS:
      return {
        ...state,
        isSuccessCreate: true,
        questionData: {
          Id: action?.data?.DT?.id,
        },
      };
    default:
      return state;
  }
};

export default questionReducer;

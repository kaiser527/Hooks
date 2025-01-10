import {
  FETCH_QUIZ_USER_SUCCESS,
  FETCH_QUIZ_ADMIN_SUCCESS,
} from "../action/quizAction";

const INITIAL_STATE = {
  quizData: {
    arrQuiz: [],
    listQuiz: [],
  },
  isSuccessAdminFetch: false,
  isSuccessUserFetch: false,
};

const quizReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_QUIZ_USER_SUCCESS: {
      return {
        ...state,
        quizData: {
          arrQuiz: action?.dataQuiz?.DT,
        },
        isSuccessUserFetch: true,
      };
    }

    case FETCH_QUIZ_ADMIN_SUCCESS: {
      return {
        ...state,
        quizData: {
          listQuiz: action?.dataQuiz?.DT,
        },
        isSuccessAdminFetch: true,
      };
    }
    default:
      return state;
  }
};

export default quizReducer;

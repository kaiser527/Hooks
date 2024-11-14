import {
  CREATE_QUIZ_SUCCESS,
  FETCH_QUIZ_USER_SUCCESS,
  FETCH_QUIZ_ADMIN_SUCCESS,
  DELETE_QUIZ_ADMIN_SUCCESS,
  UPDATE_QUIZ_ADMIN_SUCCESS,
} from "../action/quizAction";

const INITIAL_STATE = {
  quizData: {
    arrQuiz: [],
    listQuiz: [],
  },
};

const quizReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_QUIZ_USER_SUCCESS: {
      return {
        ...state,
        quizData: {
          arrQuiz: action?.dataQuiz?.DT,
        },
      };
    }

    case FETCH_QUIZ_ADMIN_SUCCESS: {
      return {
        ...state,
        quizData: {
          listQuiz: action?.dataQuiz?.DT,
        },
      };
    }

    case CREATE_QUIZ_SUCCESS:
      return {
        ...state,
        quizData: {
          listQuiz: action?.dataQuiz?.DT,
        },
      };

    case DELETE_QUIZ_ADMIN_SUCCESS: {
      return {
        ...state,
        quizData: {
          listQuiz: action?.dataQuiz?.DT,
        },
      };
    }

    case UPDATE_QUIZ_ADMIN_SUCCESS: {
      return {
        ...state,
        quizData: {
          listQuiz: action?.dataQuiz?.DT,
        },
      };
    }
    default:
      return state;
  }
};

export default quizReducer;

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
  isSuccessAdminFetch: false,
  isSuccessUserFetch: false,
  isSuccessAdminCreate: false,
  isSuccessAdminDelete: false,
  isSuccessAdminUpdate: false,
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

    case CREATE_QUIZ_SUCCESS:
      return {
        ...state,
        quizData: {
          listQuiz: action?.dataQuiz?.DT,
        },
        isSuccessAdminCreate: true,
      };

    case DELETE_QUIZ_ADMIN_SUCCESS: {
      return {
        ...state,
        quizData: {
          listQuiz: action?.dataQuiz?.DT,
        },
        isSuccessAdminDelete: true,
      };
    }

    case UPDATE_QUIZ_ADMIN_SUCCESS: {
      return {
        ...state,
        quizData: {
          listQuiz: action?.dataQuiz?.DT,
        },
        isSuccessAdminUpdate: true,
      };
    }
    default:
      return state;
  }
};

export default quizReducer;

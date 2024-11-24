import { combineReducers } from "redux";
import userReducer from "./userReducer";
import quizReducer from "./quizReducer";
import questionReducer from "./questionReducer";
import answerReducer from "./answerReducer";

const rootReducer = combineReducers({
  user: userReducer,
  quiz: quizReducer,
  question: questionReducer,
  answer: answerReducer,
});

export default rootReducer;

import { postCreateNewQuestionForQuiz } from "../../services/apiServices";
import { toast } from "react-toastify";

export const CREATE_QUESTION_FOR_QUIZ_SUCCESS =
  "CREATE_QUESTION_FOR_QUIZ_SUCCESS";

export const CreateNewQuestionForQuizRedux = (id, description, image) => {
  return async (dispatch, getState) => {
    const res = await postCreateNewQuestionForQuiz(id, description, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      dispatch(createQuestionForQuizSuccess(res));
    } else {
      toast.error(res.EM);
    }
    console.log(">>>check res: ", res);
  };
};

export const createQuestionForQuizSuccess = (data) => {
  return {
    type: CREATE_QUESTION_FOR_QUIZ_SUCCESS,
    data: data,
  };
};

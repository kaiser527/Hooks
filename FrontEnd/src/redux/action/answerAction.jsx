import { postCreateNewAnswerForQuestion } from "../../services/apiServices";
import { toast } from "react-toastify";

export const CREATE_ANSWER_FOR_QUESTION_SUCCESS =
  "CREATE_ANSWER_FOR_QUESTION_SUCCESS";

export const CreateNewAnswerForQuestionRedux = (
  description,
  correct_answer,
  question_id
) => {
  return async (dispatch, getState) => {
    const res = await postCreateNewAnswerForQuestion(
      description,
      correct_answer,
      question_id
    );
    if (res && res.EC === 0) {
      toast.success(res.EM);
      dispatch(createAnswerForQuestionSuccess());
    } else {
      toast.error(res.EM);
    }
  };
};

export const createAnswerForQuestionSuccess = () => {
  return {
    type: CREATE_ANSWER_FOR_QUESTION_SUCCESS,
  };
};

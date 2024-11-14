import {
  deleteQuizById,
  getAllQuizForAdmin,
  getQuizByUser,
  postCreateNewQuiz,
  putUpdateQuiz,
} from "../../services/apiServices";
import { toast } from "react-toastify";

export const CREATE_QUIZ_SUCCESS = "CREATE_QUIZ_SUCCESS";

export const FETCH_QUIZ_USER_SUCCESS = "FETCH_QUIZ_USER_SUCCESS";

export const FETCH_QUIZ_ADMIN_SUCCESS = "FETCH_QUIZ_ADMIN_SUCCESS";

export const DELETE_QUIZ_ADMIN_SUCCESS = "DELETE_QUIZ_ADMIN_SUCCESS";

export const UPDATE_QUIZ_ADMIN_SUCCESS = "UPDATE_QUIZ_ADMIN_SUCCESS";

export const createNewQuizRedux = (description, name, difficulty, image) => {
  return async (dispatch, getState) => {
    const res = await postCreateNewQuiz(description, name, difficulty, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      dispatch(createQuizSuccess());
      dispatch(fetchAllQuizForAdmin());
    } else {
      toast.error(res.EM);
    }
  };
};

export const createQuizSuccess = () => {
  return {
    type: CREATE_QUIZ_SUCCESS,
  };
};

export const fetchAllQuizByUser = () => {
  return async (dispatch, getState) => {
    const res = await getQuizByUser();
    if (res && res.EC === 0) {
      dispatch(fetchQuizUserSuccess(res));
    }
  };
};

export const fetchQuizUserSuccess = (data) => {
  return {
    type: FETCH_QUIZ_USER_SUCCESS,
    dataQuiz: data,
  };
};

export const fetchAllQuizForAdmin = () => {
  return async (dispatch, getState) => {
    const res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      dispatch(fetchQuizAdminSuccess(res));
    }
  };
};

export const fetchQuizAdminSuccess = (data) => {
  return {
    type: FETCH_QUIZ_ADMIN_SUCCESS,
    dataQuiz: data,
  };
};

export const deleteQuizForAdmin = (id) => {
  return async (dispatch, getState) => {
    const res = await deleteQuizById(id);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      dispatch(deleteQuizAdminSuccess());
      dispatch(fetchAllQuizForAdmin());
    } else {
      toast.error(res.EM);
    }
  };
};

export const deleteQuizAdminSuccess = () => {
  return {
    type: DELETE_QUIZ_ADMIN_SUCCESS,
  };
};

export const updateQuizForAdmin = (
  id,
  description,
  name,
  difficulty,
  image
) => {
  return async (dispatch, getState) => {
    const res = await putUpdateQuiz(id, description, name, difficulty, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      dispatch(updateQuizAdminSuccess());
      dispatch(fetchAllQuizForAdmin());
    } else {
      toast.error(res.EM);
    }
  };
};

export const updateQuizAdminSuccess = () => {
  return {
    type: UPDATE_QUIZ_ADMIN_SUCCESS,
  };
};

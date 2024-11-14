import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuizForAdmin } from "../../../../redux/action/quizAction";
import ModelDeleteQuiz from "./ModelDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";

const TableQuiz = () => {
  const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
  const [quizDelete, setQuizDelete] = useState({});
  const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
  const [quizUpdate, setQuizUpdate] = useState({});

  const listQuiz = useSelector((state) => state.quiz.quizData.listQuiz);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllQuizForAdmin());
  }, []);

  const handleClickBtnDelete = (quiz) => {
    setQuizDelete(quiz);
    setShowModalDeleteQuiz(true);
  };

  const handleClickBtnUpdate = (quiz) => {
    setQuizUpdate(quiz);
    setShowModalUpdateQuiz(true);
  };

  return (
    <>
      <div>List Quizzes:</div>
      <table className="table table-bordered table-striped table-hover mt-3">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.map((quiz, index) => {
              return (
                <tr key={`table-quiz-${index}`}>
                  <td>{quiz.id}</td>
                  <td>{quiz.name}</td>
                  <td>{quiz.description}</td>
                  <td>{quiz.difficulty}</td>
                  <td style={{ display: "flex", gap: "15px" }}>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleClickBtnDelete(quiz)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleClickBtnUpdate(quiz)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ModelDeleteQuiz
        show={showModalDeleteQuiz}
        setShow={setShowModalDeleteQuiz}
        quizDelete={quizDelete}
      />
      <ModalUpdateQuiz
        show={showModalUpdateQuiz}
        setShow={setShowModalUpdateQuiz}
        quizUpdate={quizUpdate}
      />
    </>
  );
};

export default TableQuiz;

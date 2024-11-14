import { useEffect } from "react";
import "./ListQuiz.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuizByUser } from "../../redux/action/quizAction";

const ListQuiz = (props) => {
  const arrQuiz = useSelector((state) => state.quiz.quizData.arrQuiz);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllQuizByUser());
  }, []);

  return (
    <div className="list-quiz-container container">
      {arrQuiz &&
        arrQuiz.length > 0 &&
        arrQuiz.map((quiz, index) => {
          return (
            <div
              className="card"
              style={{ width: "18rem" }}
              key={`${index}-quiz`}
            >
              <img
                src={`data:image/jpeg;base64,${quiz.image}`}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Quiz {index + 1}</h5>
                <p className="card-text">{quiz.description}</p>
                <button
                  className="btn btn-primary"
                  onClick={
                    () =>
                      navigate(`/quiz/${quiz.id}`, {
                        state: { quizTitle: quiz.description },
                      }) //truyen data truoc khi den trang dich
                  }
                >
                  Start Now
                </button>
              </div>
            </div>
          );
        })}

      {arrQuiz && arrQuiz.length === 0 && (
        <div>
          <p> You don't have any quiz now...</p>
        </div>
      )}
    </div>
  );
};

export default ListQuiz;

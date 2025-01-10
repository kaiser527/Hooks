import { useRef } from "react";
import CountDown from "./CountDown";

const RightContent = (props) => {
  const refDiv = useRef([]);

  const onTimeUp = () => {
    props.handleFinishQuiz();
    alert("times up");
  };

  const getClassQuestion = (question, index) => {
    //check answered
    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.find(
        (answer) => answer.isSelected === true
      );
      if (isAnswered) {
        return "question selected";
      }
    }
    return "question";
  };

  const handleClickQuestion = (index, question) => {
    props.setIndex(index);
    if (refDiv.current) {
      refDiv.current.forEach((item) => {
        if (item && item.className === "question clicked") {
          item.className = "question";
        }
      });
    }
    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.find(
        (answer) => answer.isSelected === true
      );
      if (isAnswered) {
        return;
      }
    }
    refDiv.current[index].className = "question clicked";
  };

  return (
    <>
      <div className="main-timer">
        <CountDown onTimeUp={onTimeUp} />
      </div>
      <div className="main-question">
        {props.dataQuiz &&
          props.dataQuiz.length > 0 &&
          props.dataQuiz.map((question, index) => {
            return (
              <div
                key={`data-quiz-${index}`}
                className={getClassQuestion(question, index)}
                onClick={() => handleClickQuestion(index, question)}
                ref={(element) => (refDiv.current[index] = element)}
              >
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RightContent;

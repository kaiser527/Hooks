import _ from "lodash";
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";

const Question = (props) => {
  const { dataQuiz, index, handleCheckBox } = props;

  const [isPreviewImage, setIsPreviewImage] = useState(false);

  if (_.isEmpty(dataQuiz)) {
    return <></>; //khi dataQuiz bang rong thi kh can render
  }

  const handleOnChangeCheckBox = (event, aId, qId) => {
    handleCheckBox(aId, qId);
  };

  return (
    <>
      {dataQuiz.image ? (
        <div className="q-image">
          <img
            style={{ cursor: "pointer" }}
            src={`data:image/jpeg;base64,${dataQuiz.image}`}
            alt="question image"
            onClick={() => setIsPreviewImage(true)}
          />
          {isPreviewImage === true && (
            <Lightbox
              image={`data:image/jpeg;base64,${dataQuiz.image}`}
              title={"Question Image"}
              onClose={() => setIsPreviewImage(false)}
            ></Lightbox>
          )}
        </div>
      ) : (
        <div className="q-image"></div>
        //render ra div rong de cho chieu cao dep
      )}
      <div className="question">
        Question {index + 1}: {dataQuiz.questionDescription} ?
      </div>
      <div className="answer">
        {dataQuiz.answers &&
          dataQuiz.answers.length > 0 &&
          dataQuiz.answers.map((item, index) => {
            return (
              <div key={`answer-${index}`} className="a-child">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={item.isSelected}
                    onChange={(event) =>
                      handleOnChangeCheckBox(
                        event,
                        item.id,
                        dataQuiz.questionId
                      )
                    }
                  />
                  <label className="form-check-label">{item.description}</label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;

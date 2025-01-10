import { useEffect, useState } from "react";
import Select from "react-select";
import { BsFillPatchPlusFill, BsFillPatchMinusFill } from "react-icons/bs";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import "./QuizQA.scss";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuizForAdmin } from "../../../../redux/action/quizAction";
import { getQuizWithQA, postUpsertQA } from "../../../../services/apiServices";
import { toast } from "react-toastify";

const QuizQA = (props) => {
  const initQuestion = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ];

  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [questions, setQuestions] = useState(initQuestion);
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataImagePreview, setDataImagePreview] = useState({
    title: "",
    url: "",
  });
  const [listQuizQuestion, setListQuizQuestion] = useState([]);

  const listQuiz = useSelector((state) => state.quiz.quizData.listQuiz);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchQuiz();
  }, []);

  useEffect(() => {
    if (selectedQuiz && selectedQuiz.value) {
      fetchQuizWithQA();
    }
  }, [selectedQuiz]);

  const urltoFile = (url, filename, mimeType) => {
    if (url.startsWith("data:")) {
      let arr = url.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      let file = new File([u8arr], filename, { type: mime || mimeType });
      return Promise.resolve(file);
    }
    return fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: mimeType }));
  };

  const fetchQuizWithQA = async () => {
    let res = await getQuizWithQA(selectedQuiz.value);
    if (res.EC === 0) {
      //convert
      let newQA = [];
      for (let i = 0; i < res.DT.qa.length; i++) {
        if (res.DT.qa[i].imageFile) {
          res.DT.qa[i].imageName = `Question-${res.DT.qa[i].id}.png`;
          res.DT.qa[i].imageFile = await urltoFile(
            `data:image/png;base64,${res.DT.qa[i].imageFile}`,
            `Question-${res.DT.qa[i].id}.png`,
            "image/png"
          );
        }
        newQA.push(res.DT.qa[i]);
      }
      console.log("check QA", res);
      setQuestions(newQA);
    }
  };

  const fetchQuiz = async () => {
    dispatch(fetchAllQuizForAdmin());
    let listQuizClone = _.cloneDeep(listQuiz);
    let newQuiz = listQuizClone.map((item) => {
      return {
        value: item.id,
        label: `${item.id} - ${item.description}`,
      };
    });
    setListQuizQuestion(newQuiz);
  };

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      let questionClone = _.cloneDeep(questions);
      questionClone = questionClone.filter((item) => item.id !== id);
      setQuestions(questionClone);
    }
  };

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionClone = _.cloneDeep(questions);
    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };
      let index = questionClone.findIndex((item) => item.id === questionId);
      questionClone[index].answers.push(newAnswer);
      setQuestions(questionClone);
    }
    if (type === "REMOVE") {
      let index = questionClone.findIndex((item) => item.id === questionId);
      questionClone[index].answers = questionClone[index].answers.filter(
        (item) => item.id !== answerId
      );
      setQuestions(questionClone);
    }
  };

  const handleOnChange = (type, questionId, value) => {
    if (type === "QUESTION") {
      let questionClone = _.cloneDeep(questions);
      //tim xem dang o question nao
      let index = questionClone.findIndex((item) => item.id === questionId);
      if (index > -1) {
        questionClone[index].description = value; //cap nhat gia tri cua chinh no bang o input nhap vao
        setQuestions(questionClone);
      }
    }
  };

  const handleOnChangeFileQuestion = (questionId, event) => {
    let questionClone = _.cloneDeep(questions);
    //tim xem dang o question nao
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (
      index > -1 &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      questionClone[index].imageFile = event.target.files[0]; //cap nhat gia tri cua chinh no bang o input nhap vao
      questionClone[index].imageName = event.target.files[0].name; //check console.log
      setQuestions(questionClone);
    }
  };

  const handleAnswerQuestion = (type, answerId, questionId, value) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      questionClone[index].answers = questionClone[index].answers.map(
        (answer) => {
          //con thang nao thay doi thi chay vao day
          if (answer.id === answerId) {
            if (type === "CHECKBOX") {
              answer.isCorrect = value;
            }
            if (type === "INPUT") {
              answer.description = value;
            }
          }
          return answer; //doi voi nhung thang nao kh thay doi thi tra ra y nguyen
        }
      );
      setQuestions(questionClone);
    }
  };

  const handleSubmitQuestionForQuiz = async () => {
    //todo
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Plz choose a Quiz!");
      return;
    }

    //validate answer
    let isValidA = true;
    let indexQuestion = 0,
      indexAnswer = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidA = false;
          indexAnswer = j;
          break;
        }
      }
      indexQuestion = i;
      if (isValidA === false) break;
    }

    if (isValidA === false) {
      toast.error(
        `Invalid Answer ${indexAnswer + 1} at Question ${indexQuestion + 1}`
      );
      return;
    }

    //validate question
    let isValidQ = true;
    let indexQ = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQ = false;
        indexQ = i;
        break;
      }
    }

    if (isValidQ === false) {
      toast.error(`Not empty description for question ${indexQ + 1}`);
      return;
    }

    let questionClone = _.cloneDeep(questions);
    for (let i = 0; i < questionClone.length; i++) {
      if (questionClone[i].imageFile) {
        questionClone[i].imageFile = await toBase64(questionClone[i].imageFile);
      }
    }

    let res = await postUpsertQA({
      quizId: selectedQuiz.value,
      questions: questionClone,
    });

    if (res && res.EC === 0) {
      toast.success(res.EM);
      fetchQuizWithQA();
    }

    setQuestions(initQuestion);
  };

  const handlePreviewImage = (questionId) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      setDataImagePreview({
        url: URL.createObjectURL(questionClone[index].imageFile),
        title: questionClone[index].imageName,
      });
      setIsPreviewImage(true);
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  return (
    <div className="questions-container">
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label className="mb-2">Select Quiz:</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuizQuestion}
          />
        </div>
        <div className="mt-3 mb-2">Add questions:</div>
        {questions &&
          questions.length > 0 &&
          questions.map((question, index) => {
            return (
              <div key={question.id} className="q-main mb-5">
                <div className="questions-content">
                  <div className="form-floating description">
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      value={question.description}
                      onChange={(event) =>
                        handleOnChange(
                          "QUESTION",
                          question.id,
                          event.target.value
                        )
                      }
                    />
                    <label>Question {index + 1}'s description</label>
                  </div>
                  <div className="group-upload">
                    <label className="label-upload" htmlFor={`${question.id}`}>
                      <RiImageAddFill className="label-upload" />
                    </label>
                    <input
                      id={`${question.id}`}
                      type="file"
                      hidden
                      onChange={(event) =>
                        handleOnChangeFileQuestion(question.id, event)
                      }
                    />
                    <span>
                      {question.imageName ? (
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => handlePreviewImage(question.id)}
                        >
                          {question.imageName}
                        </span>
                      ) : (
                        "0 file is uploaded"
                      )}
                    </span>
                  </div>
                  <div className="btn-add">
                    <span onClick={() => handleAddRemoveQuestion("ADD", "")}>
                      <BsFillPatchPlusFill className="icon-add" />
                    </span>
                    {questions.length > 1 && (
                      <span
                        onClick={() =>
                          handleAddRemoveQuestion("REMOVE", question.id)
                        }
                      >
                        <BsFillPatchMinusFill className="icon-remove" />
                      </span>
                    )}
                  </div>
                </div>

                {question.answers &&
                  question.answers.length > 0 &&
                  question.answers.map((answer, index) => {
                    return (
                      <div key={answer.id} className="answers-content">
                        <input
                          className="form-check-input iscorrect"
                          type="checkbox"
                          checked={answer.isCorrect}
                          onChange={(event) =>
                            handleAnswerQuestion(
                              "CHECKBOX",
                              answer.id,
                              question.id,
                              event.target.checked
                            )
                          }
                        />
                        <div className="form-floating answer-name">
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            value={answer.description}
                            onChange={(event) =>
                              handleAnswerQuestion(
                                "INPUT",
                                answer.id,
                                question.id,
                                event.target.value
                              )
                            }
                          />
                          <label>Answers {index + 1}</label>
                        </div>
                        <div className="btn-group">
                          <span
                            onClick={() =>
                              handleAddRemoveAnswer("ADD", question.id, "")
                            }
                          >
                            <AiOutlinePlusCircle className="icon-add" />
                          </span>
                          {question.answers.length > 1 && (
                            <span
                              onClick={() =>
                                handleAddRemoveAnswer(
                                  "REMOVE",
                                  question.id,
                                  answer.id
                                )
                              }
                            >
                              <AiOutlineMinusCircle className="icon-remove" />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        {questions && questions.length > 0 && (
          <div>
            <button
              className="btn btn-warning"
              onClick={() => handleSubmitQuestionForQuiz()}
            >
              Save Questions
            </button>
          </div>
        )}
        {isPreviewImage === true && (
          <Lightbox
            image={dataImagePreview.url}
            title={dataImagePreview.title}
            onClose={() => setIsPreviewImage(false)}
          ></Lightbox>
        )}
      </div>
    </div>
  );
};

export default QuizQA;

import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuizById, postSubmitQuiz } from "../../services/apiServices";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import { toast } from "react-toastify";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";

const DetailQuiz = () => {
  let params = useParams(); //lay duoc object chua gia tri tham so tren duong link url hien tai sau khi khai bao phia route

  let quizId = params.id; //truy cap den thuoc tinh id ben trong object sau khi lay duoc thong qua hook useParams()

  let location = useLocation(); //muon biet truoc khi vao trang chi tiet nay nguoi dung tu trang nao truyen toi trang nay(lay duoc state,props,... tu component khac truyen vao thong qua navigate)

  const [dataQuiz, setDataQuiz] = useState([]);
  //vi 1 bai quiz co nhieu question ma moi lan chi muon render ra 1 question nen tao state index de cho biet nguoi dung dang o trang nao khi bam next se set lai index = index + 1 khi bam prev thi ngc lai
  //o day khoi tao gia tri ban dau index = 0 tuong ung voi phan tu dau tien trong mang dataQuiz
  //chi so index tuong ung voi phan tu thu i trong mang dataQuiz
  const [index, setIndex] = useState(0);
  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});

  useEffect(() => {
    fetchQuestions();
  }, [quizId]); //moi lan quizId thay doi se render ra nhung question khac nhau tuong ung voi tung quiz

  const fetchQuestions = async () => {
    let res = await getDataQuizById(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        .groupBy("id")
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            answers.push(item.answers);
          });
          return { questionId: key, answers, questionDescription, image };
        })
        .value();
      setDataQuiz(data);
    }
  };

  const handlePrev = () => {
    if (index - 1 < 0) {
      return;
    }
    setIndex(index - 1);
  };

  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) {
      setIndex(index + 1);
    }
  };

  const handleCheckBox = (answerId, questionId) => {
    //khi thao tac voi bien clone se kh update lai giao dien
    //khi nao lam xong update lai bien clone se update lai giao dien
    let dataQuizClone = _.cloneDeep(dataQuiz); //sao chep tat ca object trong mang
    //thong bao cho thang cha biet dang o question nao(tim thay question hien tai)
    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId
    ); //bo dau cong vao de tranh truong hop no la kieu string thi tu dong chuyen sang kieu number luon
    if (question && question.answers) {
      //sau khi tim thay thi can phai update lai cau tra loi
      question.answers = question.answers.map((item) => {
        //so sanh cai id answer ban dau voi id answer chung ta nhung vao co giong nhau
        //neu giong nhau co nghia la click chon thi se chuyen isSelected sang true va nguoc lai
        if (+item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
    }

    //de cho thang cha biet khi nao duoc cau hoi nao duoc cap nhat lai
    //co nghia la tim nguoc lai xem dang muon update lai cau hoi nao
    let index = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId
    );
    //ham findIndex neu tim thay se tra ra chi so index cua mang neu kh se tra ra -1
    //neu tim thay co nghia la click chon thi chi cap nhat dung cai cau tra loi do thoi
    if (index > -1) {
      //sau khi tim thay cau hoi muon update thi set lai data
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }
  };

  const handleFinishQuiz = async () => {
    //   {
    //     "quizId": 1,
    //     "answers": [
    //         {
    //             "questionId": 1,
    //             "userAnswerId": [3]
    //         },
    //         {
    //             "questionId": 2,
    //             "userAnswerId": [6]
    //         }
    //      ]
    //    }
    console.log("check data before submit", dataQuiz);
    let payload = { quizId: +quizId, answers: [] };
    let answers = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((question) => {
        let questionId = question.questionId;
        let userAnswerId = [];
        question.answers.forEach((a) => {
          if (a.isSelected) {
            userAnswerId.push(a.id);
          }
        });
        answers.push({ questionId: +questionId, userAnswerId });
      });
      payload.answers = answers;
      //submit api
      const res = await postSubmitQuiz(payload);
      console.log("check res", res);
      if (res && res.EC === 0) {
        setDataModalResult({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData,
        });
        setIsShowModalResult(true);
      } else {
        toast.error(res.EC);
      }
    }
  };

  console.log(">>>check data quiz:", dataQuiz);
  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId}: {location?.state?.quizTitle}
        </div>
        <hr />
        <div className="q-body">
          <img />
        </div>
        <div className="q-content">
          {/*de moi lan nhan next hoac prev tao ra su thay doi data tuong ung thi can truyen props tu DetailQuiz sang question thi moi su thay doi tu cha cung dan den su thay doi tu con*/}
          <Question
            index={index}
            handleCheckBox={handleCheckBox}
            dataQuiz={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
          />
          {/*dataQuiz={dataQuiz[index]} bi loi vi lan dau tien goi den dataQuiz la mang rong mang o day muon lay ra phan tu dau tien cua mang nen se bi loi  */}
        </div>
        <div className="footer">
          <button className="btn btn-secondary" onClick={() => handlePrev()}>
            Prev
          </button>
          <button className="btn btn-primary" onClick={() => handleNext()}>
            Next
          </button>
          <button
            className="btn btn-warning"
            onClick={() => handleFinishQuiz()}
          >
            Finish
          </button>
        </div>
      </div>
      <div className="right-content">
        <RightContent
          dataQuiz={dataQuiz}
          handleFinishQuiz={handleFinishQuiz}
          setIndex={setIndex}
        />
      </div>
      <ModalResult
        show={isShowModalResult}
        setShow={setIsShowModalResult}
        dataModalResult={dataModalResult}
      />
    </div>
  );
};

export default DetailQuiz;

import Select from "react-select";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuizForAdmin } from "../../../../redux/action/quizAction";
import _ from "lodash";
import {
  getAllUser,
  postAssignQuizToUser,
} from "../../../../services/apiServices";
import { toast } from "react-toastify";

const AssignQuiz = (props) => {
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listQuizQuestion, setListQuizQuestion] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    fetchQuiz();
    fetchUser();
  }, []);

  const dispatch = useDispatch();

  const listQuiz = useSelector((state) => state.quiz.quizData.listQuiz);

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

  const fetchUser = async () => {
    let res = await getAllUser();
    if (res.EC === 0) {
      let newListUser = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.username} - ${item.email}`,
        };
      });
      console.log(newListUser);
      setListUser(newListUser);
    }
  };

  const handleAssign = async () => {
    let res = await postAssignQuizToUser(
      selectedQuiz.value,
      selectedUser.value
    );
    if (res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="assign-quiz-container row">
      <div className="col-6 form-group">
        <label className="mb-2">Select Quiz:</label>
        <Select
          defaultValue={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuizQuestion}
        />
      </div>
      <div className="col-6 form-group">
        <label className="mb-2">Select User:</label>
        <Select
          defaultValue={selectedUser}
          onChange={setSelectedUser}
          options={listUser}
        />
      </div>
      <div>
        <button className="btn btn-warning mt-3" onClick={() => handleAssign()}>
          Assign
        </button>
      </div>
    </div>
  );
};

export default AssignQuiz;

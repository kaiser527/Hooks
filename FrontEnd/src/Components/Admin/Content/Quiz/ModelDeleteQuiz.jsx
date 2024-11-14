import _ from "lodash";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { deleteQuizForAdmin } from "../../../../redux/action/quizAction";

const ModelDeleteQuiz = (props) => {
  const { show, setShow, quizDelete } = props;

  const [quizId, setQuizId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (!_.isEmpty(quizDelete)) {
      setQuizId(quizDelete.id);
    }
  }, [quizDelete]);

  const handleSubmitDeleteQuiz = () => {
    dispatch(deleteQuizForAdmin(quizDelete.id));
    setShow(false);
  };

  return (
    <>
      <Modal backdrop="static" show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Delete Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this Quiz: <b>ID = {quizId}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitDeleteQuiz()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModelDeleteQuiz;

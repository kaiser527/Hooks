import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import _ from "lodash";

const ModalResult = (props) => {
  const { show, setShow, dataModalResult } = props;

  return (
    <>
      <Modal show={show} onHide={() => setShow(!show)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Your Results...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Total Questions: <b>{dataModalResult.countTotal}</b>
          </div>
          <div>
            Total Correct answers: <b>{dataModalResult.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(!show)}>
            Show answers
          </Button>
          <Button variant="primary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;

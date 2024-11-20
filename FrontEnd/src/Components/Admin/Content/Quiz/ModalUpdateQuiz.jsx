import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { useEffect, useState } from "react";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateQuizForAdmin } from "../../../../redux/action/quizAction";

const ModalUpdateQuiz = (props) => {
  const { show, setShow, quizUpdate } = props;

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(quizUpdate)) {
      setName(quizUpdate.name);
      setDescription(quizUpdate.description);
      setType(quizUpdate.difficulty);
      if (quizUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${quizUpdate.image}`);
      }
    }
  }, [quizUpdate]);

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  const handleClose = () => {
    setShow(false);
    setName("");
    setDescription("");
    setType("");
    setImage("");
    setPreviewImage("");
    setDataUpdate({});
  };

  const handleSubmitUpdateQuiz = () => {
    if (!name || !description || !type) {
      toast.error("Name/Description/Type is required");
      return;
    } else {
      dispatch(
        updateQuizForAdmin(quizUpdate.id, description, name, type, image)
      );
      handleClose();
    }
    setShow(false);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(!show)}
        size="xl"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton onClick={() => setShow(false)}>
          <Modal.Title>Update a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                value={name}
                className="form-control"
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                type="text"
                value={description}
                className="form-control"
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">Difficulty</label>
              <select
                className="form-select"
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                <option value="EASY">EASY</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HARD">HARD</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FcPlus />
                Upload File Image
              </label>
              <input
                type="file"
                id="labelUpload"
                hidden
                onChange={(event) => handleUploadImage(event)}
              />
            </div>
            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(!show)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateQuiz;

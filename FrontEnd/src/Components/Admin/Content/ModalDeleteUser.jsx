import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteUser } from "../../../services/apiServices";
import { useState, useEffect } from "react";
import _ from "lodash";

const ModalDeleteUser = (props) => {
  const {
    show,
    setShow,
    dataDelete,
    fetchListUsersWithPaginate,
    setCurrentPage,
  } = props;

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataDelete)) {
      setEmail(dataDelete.email);
    }
  }, [dataDelete]);

  const handleSubmitDeleteUser = async () => {
    const data = await deleteUser(dataDelete.id);
    console.log("component res", data);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      setShow(!show);
      //await fetchListUsers();
      setCurrentPage(1);
      await fetchListUsersWithPaginate(1);
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal show={show} onHide={() => setShow(!show)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete the User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this user's email: <b>{email}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(!show)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSubmitDeleteUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;

import React from "react";
import {
  makeStyles,
  Modal,
  ModalProps,
} from '@material-ui/core';
import TaskForm from "./TaskForm";
import useStyles from "./styles";

type CreateTaskModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const CreateTaskModal = ({
  isOpen,
  closeModal,
}: CreateTaskModalProps) => {
  const styles = useStyles();
  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
    >
      <div className={styles.paper}>
        <TaskForm
          closeModal={closeModal}
        />
      </div>
    </Modal>
  )
};

export default CreateTaskModal;

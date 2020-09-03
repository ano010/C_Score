import React, { Component } from "react";

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

class MyModal extends Component {
  state = {
    isModalOpen: false
  };
  toggleModel1 = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };
  render() {
    const {
      isOpen,
      header,
      body,
      key1,
      key2,
      toggleModal,
      onKey1,
      onKey2
    } = this.props;

    return (
      <React.Fragment>
        <Modal isOpen={isOpen}>
          <ModalHeader toggle={toggleModal}>{header}</ModalHeader>
          <ModalBody>{body}</ModalBody>
          <ModalFooter>
            <Button onClick={onKey1} color="primary">
              {key1}
            </Button>
            <Button onClick={onKey2}>{key2}</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

export default MyModal;

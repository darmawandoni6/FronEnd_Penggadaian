import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

import { view } from "../../utilities/API";

class mdlViewPembayaran extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  handleClose = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    return (
      <div>
        <FontAwesomeIcon
          icon={faImage}
          style={{
            color: "white",
            backgroundColor: "blue",
            cursor: "pointer",
          }}
          onClick={this.handleClose}
        />
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          centered
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>View Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={`${view}/${this.props.data}`} alt="image" />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default mdlViewPembayaran;

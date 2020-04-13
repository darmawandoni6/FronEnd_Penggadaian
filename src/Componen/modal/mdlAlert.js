import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { FE } from "../../utilities/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import "../../css/alert.css";
class mdlAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goPage: false
    };
  }

  Go = () => {
    this.setState({
      goPage: true
    });
  };

  render() {
    if (this.state.goPage) window.location.href = `${FE}/${this.props.link}`;
    return (
      <div>
        <Modal centered show={this.props.show}>
          <Modal.Body className="alert-body">
            <div className="box-alert">
              <FontAwesomeIcon icon={faCheck} className="font-aws" />
            </div>
            <br />
            <h3> Data Berhasil Disimpan </h3> <br />
            <Button variant="outline-success" onClick={this.Go} size="sm">
              Success
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default mdlAlert;

import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class mdlViewImg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  handleShow = () => {
    this.setState({
      show: !this.state.show,
    });
  };
  render() {
    return (
      <div>
        <Button variant="primary" size="sm" onClick={this.handleShow}>
          View
        </Button>
        <Modal
          centered
          show={this.state.show}
          onHide={this.handleShow}
          size="lg"
        >
          <Modal.Body>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={this.props.url}
                alt="No. Image"
                style={{
                  imageResolution: "300dpi",
                }}
              />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default mdlViewImg;

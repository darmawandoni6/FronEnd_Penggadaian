import React, { Component } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

class formBunga extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NAME: "Bunga",
      BUNGA: 10
    };
  }

  saveBunga = async e => {
    e.preventDefault();
    try {
      this.alertShow();
    } catch (error) {
      console.log(error.message);
    }
  };
  value = e => {
    this.props.addBunga(e.target.value);
  };

  render() {
    console.log("2", this.state);
    return (
      <div>
        {/* {this.updateBunga()} */}
        <Form onSubmit={this.saveBunga}>
          <div>
            <Form.Group as={Row}>
              <Form.Label column sm={1}>
                Bunga %
              </Form.Label>
              <Col column sm={2}>
                <Form.Control
                  type="number"
                  step="0.5"
                  min="0"
                  name="BUNGA"
                  value={this.props.data.BUNGA}
                  onChange={this.value}
                  placeholder="Bunga"
                />
              </Col>
            </Form.Group>
          </div>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </div>
    );
  }
}

export default formBunga;

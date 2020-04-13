import React, { Component } from "react";
import { Container, Row, Col, Alert, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

import Navbar from "../Componen/navbar";
import Left from "../Componen/left";
import { FE, API, headerAutorization } from "../utilities/API";
import { connect } from "react-redux";
import { getBunga, addBunga } from "../_action/bunga";
import Axios from "axios";

import "../css/nasabah.css";

class bunga extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NAME: "Bunga",
      BUNGA: 0,
    };
  }

  componentDidMount() {
    this.props.getBunga();
  }

  alertShow() {
    return <Alert variant="success">This is a alert—check it out!</Alert>;
  }

  saveBunga = async (e) => {
    e.preventDefault();
    try {
      await Axios({
        method: "post",
        url: `${API}/bunga`,
        headers: headerAutorization,
        data: {
          NAME: "Bunga",
          BUNGA: this.state.BUNGA,
        },
      });
      Swal.fire({
        title: "success",
        text: "Bunga Berhasil di Perbarui !!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Bunga Berhasil di Perbarui !!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  value = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    this.props.addBunga(e.target.value);
  };

  render() {
    const { vbunga } = this.props.bunga;
    return (
      <div>
        <Navbar />
        <Container fluid>
          <Row>
            <Col xl={2} lg={3} md={4}>
              <Left url={`${FE}/bunga`} dataMaster={"dataMaster"} />
            </Col>
            <Col xl={10} lg={9} md={8}>
              <Row>
                <Col>
                  <br />
                  <h2>
                    <FontAwesomeIcon icon={faBriefcase} /> Bunga
                  </h2>
                </Col>
              </Row>
              <Row>
                <Col>
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
                            value={vbunga}
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
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bunga: state.bunga,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getBunga: () => dispatch(getBunga()),
    addBunga: (data) => dispatch(addBunga(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(bunga);

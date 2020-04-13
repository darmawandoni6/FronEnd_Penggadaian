import React, { Component } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

import Navbar from "../Componen/navbar";
import Left from "../Componen/left";
import MdlAlert from "../Componen/modal/mdlAlert";
import { FE, API } from "../utilities/API";

import { connect } from "react-redux";
import { updateFoto } from "../_action/user";
import Axios from "axios";

import "../css/nasabah.css";

class gantiFoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      err: false,
      errKet: "",
      errUpload: null,
    };
  }

  valueChange = (e) => {
    this.setState({
      file: e.target.files[0],
    });
  };

  validasi() {
    let rt = true;
    let errStr = "";
    const size = this.state.file.size;
    const type = this.state.file.type;
    let find = type.search(/image/g);

    if (find < 0) {
      errStr = "Foto profil harus image";
      rt = false;
    } else if (size >= 1000000) {
      errStr = "Ukuran image Minimal 1000KB ";
      rt = false;
    }

    this.setState({
      err: !rt,
      errKet: errStr,
    });

    return rt;
  }

  saveFoto = (e) => {
    e.preventDefault();
    if (this.validasi()) {
      const formData = new FormData();
      formData.append("myImage", this.state.file);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      Axios.post(`${API}/upload`, formData, config)
        .then((res) => {
          const data = {
            user: this.props.user.data.user,
            foto: res.data.data,
          };
          this.props.updateFoto(data);
          this.setState({
            errUpload: false,
          });
        })
        .catch((error) => {
          console.log(error.message);
          this.setState({
            errUpload: true,
          });
        });
    }
  };
  render() {
    let open = false;
    if (this.state.errUpload === false) {
      open = true;
    }
    return (
      <div>
        <MdlAlert show={open} link="ganti-foto" />
        <Navbar />
        <Container fluid>
          <Row>
            <Col xl={2} lg={3} md={4}>
              <Left url={`${FE}/ganti-foto`} gantiFoto={"gantiFoto"} />
            </Col>
            <Col xl={10} lg={9} md={8}>
              <div className="conten-center">
                <Col xl={5} lg={6}>
                  <h3>
                    <FontAwesomeIcon icon={faImage} /> Ganti Foto
                  </h3>
                  <Form onSubmit={this.saveFoto}>
                    <Form.Group>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        name="file"
                        onChange={this.valueChange}
                        required
                        isInvalid={this.state.err}
                      />
                      <Form.Control.Feedback type="invalid">
                        {this.state.errKet}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="submit"
                      style={{ width: "100%" }}
                    >
                      Save
                    </Button>
                  </Form>
                </Col>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.cekUser,
    foto: state.updateFoto,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateFoto: (data) => dispatch(updateFoto(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(gantiFoto);

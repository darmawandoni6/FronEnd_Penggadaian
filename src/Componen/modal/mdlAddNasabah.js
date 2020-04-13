import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import Axios from "axios";
import { FE, API, headerAutorization } from "../../utilities/API";
import { Capitalize } from "../../utilities/function";

class mdlNasabah extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      KTP: "",
      NASABAH: "",
      ALAMAT: "",
      NO_TELP: "",
      errKTP: "",
      errTelp: ""
    };
  }

  handleModal = () => {
    this.setState({
      show: !this.state.show
    });
  };

  validation() {
    let erKtp = "";
    let erTelp = "";
    let valid = true;
    if (this.state.KTP.length !== 16) {
      erKtp = "Nomor KTP Harus 16 digit !!";
      valid = false;
    }
    if (this.state.NO_TELP.length < 11) {
      erTelp = "Nomor Telepon tidak sesuai !!";
      valid = false;
    }
    this.setState({
      errKTP: erKtp,
      errTelp: erTelp
    });
    return valid;
  }
  saveNasabah = async e => {
    e.preventDefault();
    if (this.validation() === true) {
      try {
        const data = {
          KTP: this.state.KTP,
          NASABAH: Capitalize(this.state.NASABAH),
          ALAMAT: Capitalize(this.state.ALAMAT),
          NO_TELP: this.state.NO_TELP,
          STATUS: "NON AKTIF"
        };

        await Axios({
          method: "POST",
          url: `${API}/nasabah`,
          headers: headerAutorization,
          data
        });

        window.location.href = `${FE}/nasabah`;
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  valueAdd = e => {
    let value = e.target.value;
    if (e.target.name === "KTP")
      value = e.target.validity.valid ? e.target.value : this.state.KTP;
    if (e.target.name === "NO_TELP")
      value = e.target.validity.valid ? e.target.value : this.state.NO_TELP;
    this.setState({
      [e.target.name]: value
    });
  };

  inputKTP() {
    if (this.state.errKTP === "") {
      return (
        <Form.Group>
          <Form.Label>No. KTP</Form.Label>
          <Form.Control
            type="text"
            name="KTP"
            pattern="[0-9]*"
            value={this.state.KTP}
            onChange={this.valueAdd}
            maxLength="16"
            placeholder="No. KTP"
            required
          />
        </Form.Group>
      );
    } else {
      return (
        <Form.Group>
          <Form.Label>No. KTP</Form.Label>
          <Form.Control
            type="text"
            name="KTP"
            pattern="[0-9]*"
            value={this.state.KTP}
            onChange={this.valueAdd}
            maxLength="16"
            placeholder="No. KTP"
            required
            isInvalid
          />
          <Form.Control.Feedback type="invalid">
            {this.state.errKTP}
          </Form.Control.Feedback>
        </Form.Group>
      );
    }
  }
  inputTelp() {
    if (this.state.errTelp === "") {
      return (
        <Form.Group>
          <Form.Label>No. Telp</Form.Label>
          <Form.Control
            type="text"
            name="NO_TELP"
            pattern="[0-9]*"
            onChange={this.valueAdd}
            value={this.state.NO_TELP}
            maxLength="13"
            placeholder="No. Telp"
            required
          />
        </Form.Group>
      );
    } else {
      return (
        <Form.Group>
          <Form.Label>No. Telp</Form.Label>
          <Form.Control
            type="text"
            name="NO_TELP"
            pattern="[0-9]*"
            onChange={this.valueAdd}
            value={this.state.NO_TELP}
            maxLength="13"
            placeholder="No. Telp"
            required
            isInvalid
          />
          <Form.Control.Feedback type="invalid">
            {this.state.errTelp}
          </Form.Control.Feedback>
        </Form.Group>
      );
    }
  }

  render() {
    return (
      <div>
        <Button variant="primary" onClick={this.handleModal}>
          + Add Nasabah
        </Button>

        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.show}
          onHide={this.handleModal}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Nasabah
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.saveNasabah}>
              {this.inputKTP()}
              <Form.Group>
                <Form.Label>Nama Nasabah</Form.Label>
                <Form.Control
                  type="text"
                  name="NASABAH"
                  onChange={this.valueAdd}
                  placeholder="Nama Nasabah"
                  value={this.state.NASABAH}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Alamat</Form.Label>
                <Form.Control
                  type="text"
                  name="ALAMAT"
                  onChange={this.valueAdd}
                  placeholder="Alamat"
                  value={this.state.ALAMAT}
                  required
                />
              </Form.Group>
              {this.inputTelp()}
              <Form.Group className="float-right">
                <Button variant="success" type="submit">
                  Save
                </Button>
                &nbsp;
                <Button variant="warning" onClick={this.handleModal}>
                  Close
                </Button>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default mdlNasabah;

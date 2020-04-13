import React, { Component } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import Axios from "axios";
import { FE, API, headerAutorization } from "../../utilities/API";
import { Capitalize } from "../../utilities/function";

class mdlAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showConfirm: false,
      errDelete: false,
      view: "",
      NASABAH: this.props.data.NASABAH,
      ALAMAT: this.props.data.ALAMAT,
      NO_TELP: this.props.data.NO_TELP
    };
  }
  handleModal(view) {
    this.setState({
      show: !this.state.show,
      view
    });
  }
  handleModal2() {
    this.setState({
      showConfirm: !this.state.showConfirm
    });
  }
  editNsabah = async e => {
    e.preventDefault();
    try {
      const tgl = new Date();
      const data = {
        NASABAH: Capitalize(this.state.NASABAH),
        ALAMAT: Capitalize(this.state.ALAMAT),
        NO_TELP: this.state.NO_TELP,
        updatedAt: tgl.toDateString()
      };
      await Axios({
        method: "PATCH",
        url: `${API}/nasabah/${this.props.data.id}`,
        headers: headerAutorization,
        data
      });
      window.location.href = `${FE}/nasabah`;
    } catch (error) {
      console.log(error.message);
    }
  };

  valueEdit = e => {
    let value = e.target.value;
    if (e.target.name === "NO_TELP")
      value = e.target.validity.valid ? e.target.value : this.state.NO_TELP;
    this.setState({
      [e.target.name]: value
    });
  };
  deleteNasabah = async () => {
    try {
      await Axios({
        method: "DELETE",
        url: `${API}/nasabah/${this.props.data.id}`,
        headers: headerAutorization
      });
      this.setState({
        showConfirm: true,
        show: false
      });
    } catch (error) {
      console.log(error.message);
      this.setState({
        showConfirm: true,
        show: false,
        errDelete: true
      });
    }
  };

  modalConfirm() {
    return (
      <Modal
        show={this.state.showConfirm}
        centered
        onHide={() => {
          this.handleModal2();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Nasabah</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!this.state.errDelete ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <b>Delelet data Berhasil ..!!</b>
              <br />
              <Button
                variant="primary"
                onClick={() => {
                  window.location.href = `${FE}/nasabah`;
                }}
              >
                Ok
              </Button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <b>Delelet gagal ..!!</b>
              <br />
              <Button
                variant="primary"
                onClick={() => {
                  this.handleModal2();
                }}
              >
                Ok
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    );
  }

  render() {
    return (
      <div>
        <FontAwesomeIcon
          icon={faSearch}
          style={{ color: "green", cursor: "pointer" }}
          onClick={() => {
            this.handleModal("faSearch");
          }}
        />
        &nbsp; &nbsp;
        <FontAwesomeIcon
          icon={faEdit}
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => {
            this.handleModal("faEdit");
          }}
        />
        &nbsp; &nbsp;
        <FontAwesomeIcon
          icon={faTrash}
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => {
            this.handleModal("faTrash");
          }}
        />
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.show}
          onHide={() => {
            this.handleModal(this.state.view);
          }}
        >
          {this.state.view === "faSearch" ? (
            <div>
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Detail Nasabah
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>KTP</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.props.data.KTP}
                      size="sm"
                      disabled
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Nama Nasabah</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.props.data.NASABAH}
                      size="sm"
                      disabled
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Alamat</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      value={this.props.data.ALAMAT}
                      size="sm"
                      disabled
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>No. Telepon</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.props.data.NO_TELP}
                      size="sm"
                      disabled
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.props.data.STATUS}
                      size="sm"
                      disabled
                    />
                  </Form.Group>
                  <Form.Group className="float-right">
                    <Button
                      variant="warning"
                      onClick={() => {
                        this.handleModal(this.state.view);
                      }}
                    >
                      Close
                    </Button>
                  </Form.Group>
                </Form>
              </Modal.Body>
            </div>
          ) : null}

          {this.state.view === "faEdit" ? (
            <div>
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Detail Nasabah
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={this.editNsabah}>
                  <Form.Group>
                    <Form.Label>KTP</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.props.data.KTP}
                      size="sm"
                      disabled
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Nama Nasabah</Form.Label>
                    <Form.Control
                      type="text"
                      name="NASABAH"
                      value={this.state.NASABAH}
                      onChange={this.valueEdit}
                      size="sm"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Alamat</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="ALAMAT"
                      rows="3"
                      value={this.state.ALAMAT}
                      onChange={this.valueEdit}
                      size="sm"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>No. Telepon</Form.Label>
                    <Form.Control
                      type="text"
                      name="NO_TELP"
                      value={this.state.NO_TELP}
                      onChange={this.valueEdit}
                      size="sm"
                      maxLength="13"
                      pattern="[0-9]*"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.props.data.STATUS}
                      size="sm"
                      disabled
                    />
                  </Form.Group>
                  <Form.Group className="float-right">
                    <Button variant="success" type="submit">
                      Save
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      variant="warning"
                      onClick={() => {
                        this.handleModal(this.state.view);
                      }}
                    >
                      Close
                    </Button>
                  </Form.Group>
                </Form>
              </Modal.Body>
            </div>
          ) : null}
          {this.state.view === "faTrash" ? (
            <div>
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Delete Nasabah
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <b>
                    Delete Nasabah &quot;
                    {this.props.data.KTP + " - " + this.props.data.NASABAH}
                    &quot;?
                  </b>
                  <br />
                  <div>
                    <Button
                      variant="outline-success"
                      onClick={this.deleteNasabah}
                    >
                      Yes
                    </Button>
                    &nbsp; &nbsp;
                    <Button
                      variant="outline-danger"
                      onClick={() => {
                        this.handleModal(this.state.view);
                      }}
                    >
                      No
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </div>
          ) : null}
        </Modal>
        {this.modalConfirm()}
      </div>
    );
  }
}

export default mdlAction;

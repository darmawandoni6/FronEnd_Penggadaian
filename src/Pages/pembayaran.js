import React, { Component } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchive,
  faArrowAltCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import Navbar from "../Componen/navbar";
import Left from "../Componen/left";
import Browse from "../Componen/modal/mdlBrowse2";
import ViewIMG from "../Componen/modal/mdlViewImg";
import MdlAlert from "../Componen/modal/mdlAlert";
import { FE, API } from "../utilities/API";
import { rupiahInteger, rupiah } from "../utilities/function";

import { connect } from "react-redux";
import { getPinjaman } from "../_action/pinjaman";
import { upload } from "../_action/upload";
import { addPembayaran } from "../_action/pembayaran";
import { updateStatus } from "../_action/nasabah";
import Axios from "axios";

import "../css/nasabah.css";

class pembayaran extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ID_PEMINJAMAN: "",
      BUKTI_TRANS: "",
      TGL_TRANS: new Date().toISOString().substring(0, 10),
      TOTAL: "",
      NASABAH: "",
      NO_PEMINJAMAN: "",
      file: null,
      showIMG: "",

      //validasi
      vNO_PEMINJAMAN: false,
      vTotal: false,
      vImamge: false,
      errUpload: null,
    };
  }

  componentDidMount() {
    this.props.getPinjaman();
  }
  getData = (data) => {
    this.setState({
      ID_PEMINJAMAN: data.id,
      NO_PEMINJAMAN: data.NO_PINJAMAN,
      NASABAH: data.NASABAH,
      vNO_PEMINJAMAN: false,
    });
  };
  valueChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "file") {
      value = e.target.files[0];
      let v = "";
      if (value !== undefined) v = URL.createObjectURL(value);
      this.setState({
        showIMG: v,
      });
    }

    if (e.target.name === "TOTAL") {
      value = rupiah(e.target.value);
      let valid = false;
      if (value === "" || value === "0") valid = true;
      this.setState({
        vTotal: valid,
      });
    }
    this.setState({
      [e.target.name]: value,
    });
  };

  validasi() {
    let rt = false;
    let txt = this.state.file.type;
    let src = txt.search(/image/g);
    let size = this.state.file.size;
    if (
      !this.state.vNO_PEMINJAMAN &&
      !this.state.vTotal &&
      this.state.TOTAL !== "0"
    )
      rt = true;
    if (this.state.file !== null || this.state.file !== undefined) {
      if (src >= 0 && size <= 1000000) {
        rt = true;
        this.setState({
          vImamge: false,
        });
      } else {
        rt = false;
        this.setState({
          vImamge: true,
        });
      }
    }
    return rt;
  }
  saveData = (e) => {
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
            ID_PEMINJAMAN: this.state.ID_PEMINJAMAN,
            BUKTI_TRANS: res.data.data,
            TGL_TRANS: this.state.TGL_TRANS,
            TOTAL: rupiahInteger(this.state.TOTAL),
            STATUS: "NON AKTIF",
          };
          this.props.addPembayaran(data);
          this.props.updateStatus(data);
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

  srcData(NO_PINJAMAN) {
    const data = this.props.dataPinjaman.data;
    let find = false;

    for (let i = 0; i <= data.length - 1; i++) {
      if (data[i].NO_PINJAMAN === NO_PINJAMAN) {
        this.setState({
          ID_PEMINJAMAN: data[i].id,
          NO_PEMINJAMAN: data[i].NO_PEMINJAMAN,
          NASABAH: data[i].NASABAH.NASABAH,
          vNO_PEMINJAMAN: false,
        });
        find = true;
        break;
      }
    }
    if (!find) {
      this.setState({
        vNO_PEMINJAMAN: true,
      });
    }
    return find;
  }
  filter = (e) => {
    if (!this.srcData(e.target.value))
      this.setState({
        NASABAH: "",
        ALAMAT: "",
        NO_TELP: "",
      });

    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { data } = this.props.dataPinjaman;
    let open = false;
    if (this.state.errUpload === false) {
      open = true;
    }
    console.log(this.props.resStatus);

    return (
      <div>
        <MdlAlert show={open} link="pembayaran" />
        <Navbar />
        <Container fluid>
          <Row>
            <Col xl={2} lg={3} md={4}>
              <Left url={`${FE}/perpanjangan`} trans={"trans"} />
            </Col>
            <Col xl={10} lg={9} md={8}>
              <Row>
                <Col>
                  <br />
                  <h2>
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "rgb(33, 37, 41)",
                      }}
                      to="/pembayaran"
                    >
                      <FontAwesomeIcon
                        icon={faArrowAltCircleLeft}
                        className="arrow-back"
                      />
                    </Link>
                    &nbsp;
                    <FontAwesomeIcon icon={faArchive} /> Pembayaran
                  </h2>
                </Col>
              </Row>
              <Row>
                <Col>
                  <br />
                  <Form onSubmit={this.saveData}>
                    <Form.Group>
                      <Form.Label>No .Peminjaman</Form.Label>
                      <Row>
                        <Col xl={5} lg={7} md={10} sm={10} xs={10}>
                          <Form.Control
                            type="text"
                            name="NO_PEMINJAMAN"
                            onChange={this.filter}
                            value={this.state.NO_PEMINJAMAN}
                            placeholder="No. Peminjaman"
                            required
                            isInvalid={this.state.vNO_PEMINJAMAN}
                          />
                          <Form.Control.Feedback type="invalid">
                            No. Peminjaman Tidak Ada ...!!
                          </Form.Control.Feedback>
                        </Col>
                        <Col xl={2} lg={2} md={2} sm={2} xs={2}>
                          <Button variant="secondary">
                            {/* <FontAwesomeIcon icon={faSearch} /> */}
                            <Browse data={data} getData={this.getData} />
                          </Button>
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Nasabah</Form.Label>
                      <Row>
                        <Col xl={6} lg={8} md={12}>
                          <Form.Control
                            type="text"
                            name="NASABAH"
                            value={this.state.NASABAH}
                            placeholder="Nasabah"
                            disabled
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Bukti Transfer</Form.Label>
                      <Row>
                        <Col xl={6} lg={8} md={12}>
                          <Form.Control
                            type="file"
                            accept="image/*"
                            name="file"
                            onChange={this.valueChange}
                            required
                            isInvalid={this.state.vImamge}
                          />

                          <Form.Label style={{ paddingTop: 10 }}>
                            <ViewIMG url={this.state.showIMG} />
                          </Form.Label>
                          <Form.Control.Feedback type="invalid">
                            Bukti transafer harus format image ...!!
                          </Form.Control.Feedback>
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Tgl Transfer</Form.Label>
                      <Row>
                        <Col xl={6} lg={8} md={12}>
                          <Form.Control
                            type="date"
                            value={this.state.TGL_TRANS}
                            max={this.state.TGL_TRANS}
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Jumlah</Form.Label>
                      <Row>
                        <Col xl={6} lg={8} md={12}>
                          <Form.Control
                            type="text"
                            name="TOTAL"
                            value={this.state.TOTAL}
                            onChange={this.valueChange}
                            required
                            isInvalid={this.state.vTotal}
                          />
                          <Form.Control.Feedback type="invalid">
                            Jumlah transfer harus diisi ...!!
                          </Form.Control.Feedback>
                        </Col>
                      </Row>
                    </Form.Group>
                    <Row>
                      <Col xl={6} lg={8} md={12}>
                        <div
                          style={{
                            float: "right",
                          }}
                        >
                          <Button variant="primary" type="submit">
                            Save
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
          <br />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataPinjaman: state.getPinjaman,
    resUpload: state.upload,
    resPembayaran: state.addPembayaran,
    resStatus: state.updateStatus,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPinjaman: () => dispatch(getPinjaman()),
    upload: (data) => dispatch(upload(data)),
    addPembayaran: (data) => dispatch(addPembayaran(data)),
    updateStatus: (data) => dispatch(updateStatus(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(pembayaran);

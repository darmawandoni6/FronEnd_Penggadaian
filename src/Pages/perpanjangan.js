import React, { Component } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArchive } from "@fortawesome/free-solid-svg-icons";

import Navbar from "../Componen/navbar";
import Left from "../Componen/left";
import Browse from "../Componen/modal/mdlBrowse2";
import Alert from "../Componen/modal/mdlAlert";
import { FE } from "../utilities/API";

import { connect } from "react-redux";
import { getPinjaman } from "../_action/pinjaman";
import { addPerpanjangan } from "../_action/perpanjangan";

import "../css/nasabah.css";
class perpanjangan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NO_PINJAMAN: "",
      NASABAH: "",
      TGL_PINJAM: "",
      TGL_KEMBALI: "",
      JLH_HARI: 10,
      TGL_KEMBALI2: "",
      KET: "",
      // validasi
      val_NO_PINJAMAN: false,
    };
  }

  componentDidMount() {
    this.props.getPinjaman();
  }
  dateFormat(data) {
    const tgl = data.replace(/T[0-9]*:[0-9]*:[0-9]*.[0-9]*Z/g, "");
    const arrTgl = tgl.split("-");
    return arrTgl[1] + "-" + arrTgl[2] + "-" + arrTgl[0];
  }
  getData = (data) => {
    this.setState({
      NO_PINJAMAN: data.NO_PINJAMAN,
      NASABAH: data.NASABAH,
      TGL_PINJAM: data.TGL_PINJAM,
      TGL_KEMBALI: data.TGL_KEMBALI,
      TGL_KEMBALI2: this.penambahanHari(this.state.JLH_HARI, data.TGL_KEMBALI),
      val_NO_PINJAMAN: false,
    });
  };

  searchNP(NO_PINJAMAN) {
    const { data } = this.props.dataPinjaman;
    let find = false;
    for (let i = 0; i <= data.length - 1; i++) {
      if (data[i].NO_PINJAMAN === NO_PINJAMAN) {
        this.setState({
          NO_PINJAMAN: data[i].NO_PINJAMAN,
          NASABAH: data[i].NASABAH.NASABAH,
          TGL_PINJAM: data[i].TGL_PINJAM,
          TGL_KEMBALI: data[i].TGL_KEMBALI,
          TGL_KEMBALI2: this.penambahanHari(
            this.state.JLH_HARI,
            data[i].TGL_KEMBALI
          ),
          val_NO_PINJAMAN: false,
        });
        find = true;
        break;
      }
    }
    if (!find) {
      this.setState({
        val_NO_PINJAMAN: true,
      });
    }
    return find;
  }
  search = (e) => {
    if (!this.searchNP(e.target.value))
      this.setState({
        NASABAH: "",
        TGL_PINJAM: "",
        TGL_KEMBALI: "",
      });

    this.setState({
      NO_PINJAMAN: e.target.value,
    });
  };

  penambahanHari(day, dateAwal) {
    const tgl = dateAwal.substring(0, 10);
    const inputHari = day;
    const hariKedepan = new Date(
      new Date(tgl).getTime() + inputHari * 24 * 60 * 60 * 1000
    );
    return hariKedepan;
  }
  valueChange = (e) => {
    const val = e.target.value;
    if (e.target.name === "JLH_HARI")
      this.setState({
        JLH_HARI: val,
        TGL_KEMBALI2: this.penambahanHari(val, this.state.TGL_KEMBALI),
      });
    else
      this.setState({
        [e.target.name]: val,
      });
  };
  savePerpanjangan = (e) => {
    e.preventDefault();
    const data = {
      NO_PEMINJAMAN: this.state.NO_PINJAMAN,
      JLH_HARI: this.state.JLH_HARI,
      TGL_KEMBALI: this.state.TGL_KEMBALI2.toString(),
      KET: this.state.KET,
    };
    this.props.addPerpanjangan(data);
  };

  render() {
    const { data } = this.props.dataPinjaman;
    const resData = this.props.dataPerpanjangan.data;

    let res = false;
    if (resData.status) {
      res = true;
    }
    let tglKembali = "";
    let tglPinjam = "";
    let tglKembali2 = "";
    if (this.state.TGL_PINJAM !== "") {
      tglKembali = this.dateFormat(this.state.TGL_KEMBALI);
      tglPinjam = this.dateFormat(this.state.TGL_PINJAM);
      tglKembali2 = new Intl.DateTimeFormat("en-GB")
        .format(this.state.TGL_KEMBALI2)
        .replace(/[/]/g, "-");
    }
    return (
      <div>
        <Alert show={res} link="peminjaman" />
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
                    <FontAwesomeIcon icon={faArchive} /> Perpanjangan
                  </h2>
                </Col>
              </Row>
              <Row>
                <Col>
                  <br />
                  <Form onSubmit={this.savePerpanjangan}>
                    <Form.Group>
                      <Form.Label>No .Peminjaman</Form.Label>
                      <Row>
                        <Col xl={5} lg={7} md={10} sm={10} xs={10}>
                          <Form.Control
                            type="text"
                            placeholder="No. Peminjaman"
                            name="NO_PINJAMAN"
                            value={this.state.NO_PINJAMAN}
                            onChange={this.search}
                            isInvalid={this.state.val_NO_PINJAMAN}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            No. Peminjaman Tidak Ada ...!!
                          </Form.Control.Feedback>
                        </Col>
                        <Col xl={2} lg={2} md={2} sm={2} xs={2}>
                          <Button variant="secondary" size="sm">
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
                            value={this.state.NASABAH}
                            placeholder="Nasabah"
                            disabled
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Tgl Pinjam</Form.Label>
                      <Row>
                        <Col xl={6} lg={8} md={12}>
                          <Row>
                            <Col>
                              <Form.Control
                                type="text"
                                value={tglPinjam}
                                placeholder="Tgl Pinjam"
                                disabled
                              />
                            </Col>
                            <Col>
                              <Form.Control
                                type="text"
                                value={tglKembali}
                                placeholder="Deadline"
                                disabled
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Penambahan Hari</Form.Label>
                      <Row>
                        <Col xl={6} lg={8} md={12}>
                          <Row>
                            <Col>
                              <Form.Control
                                as="select"
                                name="JLH_HARI"
                                onChange={this.valueChange}
                              >
                                <option>10</option>
                                <option>20</option>
                                <option>30</option>
                              </Form.Control>
                            </Col>
                            <Col>
                              <Form.Control
                                type="text"
                                name="TGL_KEMBALI"
                                value={tglKembali2}
                                placeholder="Deadline"
                                disabled
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Keterangan</Form.Label>
                      <Row>
                        <Col xl={6} lg={8} md={12}>
                          <Form.Control
                            as="textarea"
                            rows="3"
                            name="KET"
                            value={this.state.KET}
                            onChange={this.valueChange}
                            required
                          />
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
    dataPerpanjangan: state.addPerpanjangan,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPinjaman: () => dispatch(getPinjaman()),
    addPerpanjangan: (data) => dispatch(addPerpanjangan(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(perpanjangan);

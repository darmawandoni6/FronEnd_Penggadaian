import React, { Component } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchive,
  faArrowAltCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../Componen/navbar";
import Left from "../Componen/left";
import MdlBrowse from "../Componen/modal/mdlBrowse";
import { FE } from "../utilities/API";
import {
  rupiah,
  rupiahInteger,
  pejumahanHari,
  converLongDate,
  IDRcurrency,
  createSN,
} from "../utilities/function";
import Swal from "sweetalert2/dist/sweetalert2.js";

// import "sweetalert2/src/sweetalert2.scss";

import { connect } from "react-redux";
import { getNasabahBrowse } from "../_action/nasabah";
import { getBunga } from "../_action/bunga";
import { pinjaman } from "../_action/pinjaman";
import { SN } from "../_action/serial_number";
import MdlAlert from "../Componen/modal/mdlAlert";

import "../css/nasabah.css";
import "../css/global.css";

class peminjaman extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      id: "",
      KTP: "",
      NASABAH: "",
      ALAMAT: "",
      NO_TELP: "",

      //barang
      MERK: "",
      BARANG: "Laptop",
      SPESIFIKASI: "",

      //PINJMAN
      // BUNGA: ,
      NILAI_MINIMAL: "",
      NILAI_MAXIMAL: "",
      PINJMAN: "",
      TGL_KEMBALI: pejumahanHari(30).toLocaleDateString(),
      TOT_PINJAMAN: "",
      //validasi
      KTP_VALID: false,
      PJ_VALID: false,

      show: true,
    };
  }

  componentDidMount() {
    this.props.getNasabah();
    this.props.getBunga();
    this.props.SN("OK");
  }

  getKTP = (data) => {
    this.setState({
      id: data.id,
      KTP: data.KTP,
      NASABAH: data.NASABAH,
      ALAMAT: data.ALAMAT,
      NO_TELP: data.NO_TELP,
      KTP_VALID: false,
    });
  };

  filterKTP = (e) => {
    if (!this.searchNasabah(e.target.value))
      this.setState({
        NASABAH: "",
        ALAMAT: "",
        NO_TELP: "",
      });

    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  value = (e) => {
    let value = e.target.value;
    if (e.target.name === "NILAI_MINIMAL") {
      const bunga = this.props.bunga.data.BUNGA / 100;
      let pjAwal = parseInt(rupiahInteger(value), 10);
      this.setState({
        NILAI_MINIMAL: rupiah(value),
        NILAI_MAXIMAL: rupiah(value),
        PINJMAN: rupiah(value),
        TOT_PINJAMAN: IDRcurrency(pjAwal + pjAwal * bunga.toString()),
      });
    } else if (e.target.name === "NILAI_MAXIMAL") {
      this.setState({
        NILAI_MAXIMAL: rupiah(value),
      });
    } else if (e.target.name === "PINJMAN") {
      const bunga = this.props.bunga.data.BUNGA / 100;
      let pjAwal = parseInt(rupiahInteger(value), 10);
      this.setState({
        PINJMAN: rupiah(value),
        TOT_PINJAMAN: IDRcurrency(pjAwal + pjAwal * bunga.toString()),
      });
    } else
      this.setState({
        [e.target.name]: value,
      });
  };

  searchNasabah(KTP) {
    const data = this.props.nasabah.data;
    let find = false;
    for (let i = 0; i <= data.length - 1; i++) {
      if (data[i].KTP === KTP) {
        this.setState({
          id: data[i].id,
          KTP: data[i].KTP,
          NASABAH: data[i].NASABAH,
          ALAMAT: data[i].ALAMAT,
          NO_TELP: data[i].NO_TELP,
          KTP_VALID: false,
        });
        find = true;
        break;
      }
    }
    if (!find) {
      this.setState({
        KTP_VALID: true,
      });
    }
    return find;
  }
  cekValidasi() {
    let err = false;
    let cvPINJAMAN = rupiahInteger(this.state.PINJMAN);
    let cvNMIN = rupiahInteger(this.state.NILAI_MINIMAL);
    let cvNMAX = rupiahInteger(this.state.NILAI_MAXIMAL);
    if (cvPINJAMAN >= cvNMIN && cvPINJAMAN <= cvNMAX) {
      this.setState({
        PJ_VALID: false,
      });
    } else {
      err = true;
      this.setState({
        PJ_VALID: true,
      });
    }
    return err;
  }
  saveTrans = (e) => {
    e.preventDefault();
    const tgl = new Date();

    if (!this.cekValidasi()) {
      const dataSN = this.props.resSN.data;
      const dataPinjaman = {
        NO_PINJAMAN: createSN(dataSN.NAME, dataSN.NO_URUT),
        ID_NAS: this.state.id,
        ID_BARANG: {
          MERK: this.state.MERK,
          BARANG: this.state.BARANG,
          SPESIFIKASI: this.state.SPESIFIKASI,
        },
        NILAI_MINIMAL: rupiahInteger(this.state.NILAI_MINIMAL),
        NILAI_MAXIMAL: rupiahInteger(this.state.NILAI_MAXIMAL),
        PINJMAN: rupiahInteger(this.state.PINJMAN),
        BUNGA: this.props.bunga.data.BUNGA,
        TGL_PINJAM: tgl.toDateString(),
        TGL_KEMBALI: this.state.TGL_KEMBALI,
        TOT_PINJAMAN: this.state.TOT_PINJAMAN.replace(/[Rp. ]/g, ""),
      };
      this.props.pinjaman(dataPinjaman);
    }
  };

  render() {
    const { data } = this.props.nasabah;
    const { error } = this.props.resPinjaman;
    const resPinjaman = this.props.resPinjaman.data;

    console.log(data);

    let res = false;
    if (resPinjaman.msg) {
      res = true;
    } else if (error) {
      Swal.fire({
        title: "Error!",
        text: "Data gagal disimpan",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    return (
      <div>
        <MdlAlert show={res} link="peminjaman" />
        <Navbar />
        <Container fluid>
          <Row>
            <Col xl={2} lg={3} md={4}>
              <Left url={`${FE}/peminjaman`} trans={"trans"} />
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
                      to="/peminjaman"
                    >
                      <FontAwesomeIcon
                        icon={faArrowAltCircleLeft}
                        className="arrow-back"
                      />
                    </Link>
                    &nbsp;
                    <FontAwesomeIcon icon={faArchive} /> Peminjaman
                  </h2>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form onSubmit={this.saveTrans}>
                    <Row>
                      <Col>
                        <br />
                        <u>
                          <h3>Data Nasabah</h3>
                        </u>
                      </Col>
                    </Row>
                    {/* tbl_nasabah */}
                    <Form.Group as={Row}>
                      <Form.Label column xl={2} lg={2} md={3} sm={3} size="sm">
                        No. KTP
                      </Form.Label>
                      <Col xl={4} lg={5} md={7} sm={10} xs={10}>
                        <Form.Control
                          type="text"
                          name="KTP"
                          pattern="[ 0-9]*"
                          onChange={this.filterKTP}
                          value={this.state.KTP}
                          placeholder="No. KTP"
                          size="sm"
                          maxLength="16"
                          required
                          isInvalid={this.state.KTP_VALID}
                        />
                        <Form.Control.Feedback type="invalid">
                          No. KTP Tidak Ada ...!!
                        </Form.Control.Feedback>
                      </Col>
                      <Col xl={2} lg={2} md={2} sm={2} xs={2}>
                        <MdlBrowse data={data} getKTP={this.getKTP} />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column xl={2} lg={2} md={3} sm={3} size="sm">
                        Nasabah
                      </Form.Label>
                      <Col xl={5} lg={6} md={8} sm={12} xs={12}>
                        <Form.Control
                          type="text"
                          value={this.state.NASABAH}
                          placeholder="Nama nasabah"
                          size="sm"
                          disabled
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column xl={2} lg={2} md={3} sm={3} size="sm">
                        No. Telp
                      </Form.Label>
                      <Col xl={5} lg={6} md={8} sm={12} xs={12}>
                        <Form.Control
                          type="text"
                          value={this.state.NO_TELP}
                          placeholder="No. Telp"
                          size="sm"
                          disabled
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column xl={2} lg={2} md={3} sm={3} size="sm">
                        Alamat
                      </Form.Label>
                      <Col xl={5} lg={6} md={8} sm={12} xs={12}>
                        <Form.Control
                          type="text"
                          value={this.state.ALAMAT}
                          placeholder="Alamat"
                          size="sm"
                          disabled
                        />
                      </Col>
                    </Form.Group>
                    {/* tbl_Barang */}
                    <Form.Group as={Row}>
                      <Form.Label column xl={2} lg={2} md={3} sm={3} size="sm">
                        Barang
                      </Form.Label>
                      <Col xl={5} lg={6} md={8} sm={12} xs={12}>
                        <Form.Control
                          as="select"
                          name="BARANG"
                          onChange={this.value}
                        >
                          <option value="Laptop">Laptop</option>
                          <option value="Handphone">Handphone</option>
                        </Form.Control>
                      </Col>
                    </Form.Group>
                    <Row>
                      <Col>
                        <u>
                          <h3>Spesifikasi Barang</h3>
                        </u>
                      </Col>
                    </Row>
                    <Form.Group as={Row}>
                      <Form.Label column xl={2} lg={2} md={3} sm={3} size="sm">
                        Merk
                      </Form.Label>
                      <Col xl={5} lg={6} md={8} sm={12} xs={12}>
                        <Form.Control
                          type="text"
                          name="MERK"
                          onChange={this.value}
                          value={this.state.MERK}
                          placeholder="Merk"
                          required
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column xl={2} lg={2} md={3} sm={3} size="sm">
                        Spesifikasi
                      </Form.Label>
                      <Col xl={5} lg={6} md={8} sm={12} xs={12}>
                        <Form.Control
                          as="textarea"
                          rows="3"
                          name="SPESIFIKASI"
                          onChange={this.value}
                          value={this.state.SPESIFIKASI}
                          required
                        />
                      </Col>
                    </Form.Group>
                    {/* tbl_pinjaman */}
                    <Row>
                      <Col>
                        <u>
                          <h3>Nilai Barang</h3>
                        </u>
                      </Col>
                    </Row>
                    <Form.Group as={Row}>
                      <Form.Label column xl={2} lg={2} md={3} sm={3}>
                        Nilai Minimal
                      </Form.Label>
                      <Col xl={5} lg={6} md={8} sm={12} xs={12}>
                        <Form.Control
                          type="text"
                          name="NILAI_MINIMAL"
                          value={this.state.NILAI_MINIMAL}
                          onChange={this.value}
                          required
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column xl={2} lg={2} md={3} sm={3} size="sm">
                        Nilai Maksimal
                      </Form.Label>
                      <Col xl={5} lg={6} md={8} sm={12} xs={12}>
                        <Form.Control
                          type="text"
                          name="NILAI_MAXIMAL"
                          onChange={this.value}
                          value={this.state.NILAI_MAXIMAL}
                          required
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column xl={2} lg={2} md={3} sm={3} size="sm">
                        Pinjaman
                      </Form.Label>
                      <Col sm={4}>
                        <Form.Control
                          type="text"
                          name="PINJMAN"
                          value={this.state.PINJMAN}
                          onChange={this.value}
                          required
                          isInvalid={this.state.PJ_VALID}
                        />
                        <Form.Control.Feedback type="invalid">
                          Pinjaman Harus dianatara Nilai Minimal dan Nilai
                          Maximal
                        </Form.Control.Feedback>
                      </Col>
                      <Form.Label column xl={2} lg={2} md={3} sm={3} size="sm">
                        /30 Hari
                      </Form.Label>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column xl={2} lg={2} md={3} sm={3} size="sm">
                        Tgl Pengembalian
                      </Form.Label>
                      <Col xl={5} lg={6} md={8} sm={12} xs={12}>
                        <Form.Control
                          type="text"
                          name="TGL_KEMBALI"
                          value={converLongDate(this.state.TGL_KEMBALI)}
                          onChange={this.value}
                          placeholder="Tgl Pengembalian"
                          required
                          disabled
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column xl={2} lg={2} md={3} sm={3} size="sm">
                        Total
                      </Form.Label>
                      <Col xl={5} lg={6} md={8} sm={12} xs={12}>
                        <Form.Control
                          disabled
                          type="text"
                          name="TOT_PINJAMAN"
                          value={this.state.TOT_PINJAMAN}
                          onChange={this.value}
                          placeholder="Total"
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Col xl={2} lg={2} md={3} sm={3}></Col>
                      <Col xl={5} lg={6} md={8} sm={12} xs={12}>
                        <Button variant="primary" type="submit">
                          Save
                        </Button>
                      </Col>
                    </Form.Group>
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
    nasabah: state.browseNasabah,
    bunga: state.bunga,
    resPinjaman: state.addPinjaman,
    resSN: state.SN,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getBunga: () => dispatch(getBunga()),
    getNasabah: () => dispatch(getNasabahBrowse()),
    pinjaman: (data) => dispatch(pinjaman(data)),
    SN: (kode) => dispatch(SN(kode)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(peminjaman);

import React, { Component } from "react";
import { Container, Row, Col, Pagination as Pag } from "react-bootstrap";

import Axios from "axios";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentPage: 1,
      perPage: 5,
      totalPage: 0
    };
  }

  componentDidMount() {
    this.getData();
  }
  getData() {
    let rec = 0;
    Axios.get("https://jsonplaceholder.typicode.com/posts")
      .then(data => {
        rec = data.data.length;
        this.setState({
          data: data.data,
          totalPage: rec
        });
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  handleClick = e => {
    this.setState({
      currentPage: Number(e.target.id)
    });
  };

  xxx() {
    return <h1>tes</h1>;
  }

  render() {
    const { data, currentPage, totalPage, perPage } = this.state;
    console.log(data);

    // Logic for displaying todos
    const indexOfLast = currentPage * perPage;
    const indexOfFirst = indexOfLast - perPage;
    const current = data.slice(indexOfFirst, indexOfLast);

    const renderData = current.map((data, id) => {
      return (
        <Row key={id} style={{ border: "1px solid black", marginBottom: 5 }}>
          <Col>
            <div>
              <b> {data.id + ". " + data.title}</b>
            </div>
            <div>{data.body}</div>
          </Col>
        </Row>
      );
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPage / perPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <Pag.Item key={number} id={number} onClick={this.handleClick}>
          {number}
        </Pag.Item>
      );
    });

    const as = this.xxx();
    return (
      <Container>
        {renderData}
        <Pag>
          <Pag.First />
          <Pag.Prev />
          {renderPageNumbers}
          <Pag.Next />
          <Pag.Last />
        </Pag>
        {as}
      </Container>
    );
  }
}

export default Pagination;

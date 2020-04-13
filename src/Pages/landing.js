import React, { Component } from "react";

import Navbar from "../Componen/navbar";
import Content from "../Componen/content";
import Footer from "../Componen/footer";

class landing extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Content />
        <Footer />
      </div>
    );
  }
}

export default landing;

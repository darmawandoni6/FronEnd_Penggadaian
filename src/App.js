import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./Pages/login";
import Register from "./Pages/register";
import Landing from "./Pages/landing";
import DataNasabah from "./Pages/dataNasabah";
import DataBarang from "./Pages/dataBarang";
import Bunga from "./Pages/bunga";
import Peminjaman from "./Pages/peminjaman";
import Peminjaman2 from "./Pages/Peminjaman2";
import Perpanjangan from "./Pages/perpanjangan";
import Pembayaran from "./Pages/pembayaran";
import PembayaranList from "./Pages/pembayaranList";
import GantiFoto from "./Pages/gantiFoto";
import GantiPass from "./Pages/gantiPass";

import Content from "./Pages/sample/Content";
import Pagination from "./Pages/sample/pagination";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/content" component={Content} />
            <Route path="/pagination">
              <Pagination />
            </Route>
            <Route path="/ganti-pass">
              <GantiPass />
            </Route>
            <Route path="/ganti-foto">
              <GantiFoto />
            </Route>
            <Route path="/pembayaran/add-pembayaran">
              <Pembayaran />
            </Route>
            <Route path="/pembayaran">
              <PembayaranList />
            </Route>

            <Route path="/perpanjangan">
              <Perpanjangan />
            </Route>
            <Route path="/peminjaman/add-peminjaman">
              <Peminjaman2 />
            </Route>
            <Route path="/peminjaman">
              <Peminjaman />
            </Route>
            <Route path="/bunga">
              <Bunga />
            </Route>
            <Route path="/barang">
              <DataBarang />
            </Route>
            <Route path="/nasabah">
              <DataNasabah />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/home">
              <Landing />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

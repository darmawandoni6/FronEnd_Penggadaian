import { createStore, combineReducers, applyMiddleware } from "redux";
import { logger, promise } from "./midleware";

import {
  signIn,
  signUP,
  cekUser,
  updateFoto,
  updatePass,
} from "../_reducer/userR";
import {
  getNasabah,
  browseNasabah,
  searchNasabah,
  updateStatus,
} from "../_reducer/nasabahR";
import { bunga } from "../_reducer/bungaR";
import { addPinjaman, getPinjaman } from "../_reducer/pinjamanR";
import { SN } from "../_reducer/serial_numberR";
import { getBarang } from "../_reducer/barang";
import { addPerpanjangan } from "../_reducer/perpanjanganR";
import { upload } from "../_reducer/uploadR";
import { addPembayaran, getPembayaran } from "../_reducer/pembayaranR";

const reducers = combineReducers({
  signIn,
  signUP,
  cekUser,
  updateFoto,
  updatePass,
  getNasabah,
  browseNasabah,
  updateStatus,
  bunga,
  searchNasabah,
  addPinjaman,
  SN,
  getPinjaman,
  getBarang,
  addPerpanjangan,
  upload,
  addPembayaran,
  getPembayaran,
});

const store = createStore(reducers, applyMiddleware(promise, logger));

export default store;

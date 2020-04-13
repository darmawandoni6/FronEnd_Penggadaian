import axios from "axios";
import { API, headerAutorization } from "../utilities/API";

export const addPembayaran = (data) => {
  return {
    type: "ADD_PEMBAYARAN",
    payload: axios({
      method: "POST",
      url: `${API}/pembayaran`,
      headers: headerAutorization,
      data,
    }),
  };
};

export const getPembayaran = () => {
  return {
    type: "GET_PEMBAYARAN",
    payload: axios({
      method: "GET",
      url: `${API}/pembayaran`,
      headers: headerAutorization,
    }),
  };
};

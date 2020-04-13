import axios from "axios";
import { API, headerAutorization } from "../utilities/API";

export const pinjaman = data => {
  return {
    type: "ADD_PINJAMAN",
    payload: axios({
      method: "POST",
      url: `${API}/pinjaman`,
      headers: headerAutorization,
      data
    })
  };
};

export const getPinjaman = () => {
  return {
    type: "GET_PINJAMAN",
    payload: axios({
      method: "GET",
      url: `${API}/pinjaman`,
      headers: headerAutorization
    })
  };
};

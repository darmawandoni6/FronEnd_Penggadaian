import axios from "axios";
import { API, headerAutorization } from "../utilities/API";

export const getBarang = () => {
  return {
    type: "GET_BARANG",
    payload: axios({
      method: "GET",
      url: `${API}/barang`,
      headers: headerAutorization
    })
  };
};

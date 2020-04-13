import axios from "axios";
import { API, headerAutorization } from "../utilities/API";

export const addPerpanjangan = data => {
  return {
    type: "ADD_PERPANJANGAN",
    payload: axios({
      method: "POST",
      url: `${API}/perpanjangan`,
      headers: headerAutorization,
      data
    })
  };
};

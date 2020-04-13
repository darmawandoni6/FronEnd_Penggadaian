import axios from "axios";
import { API, headerAutorization } from "../utilities/API";

export const SN = kode => {
  return {
    type: "SN",
    payload: axios({
      method: "GET",
      url: `${API}/sn/${kode}`,
      headers: headerAutorization
    })
  };
};

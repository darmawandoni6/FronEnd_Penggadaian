import axios from "axios";
import { API, headerAutorization } from "../utilities/API";

export const getBunga = () => {
  return {
    type: "GET_BUNGA",
    payload: axios({
      method: "GET",
      url: `${API}/bunga`,
      headers: headerAutorization
    })
  };
};
export const addBunga = data => {
  return {
    type: "ADD_BUNGA",
    data
  };
};

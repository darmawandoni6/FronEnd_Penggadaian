import axios from "axios";
import { API } from "../utilities/API";

export const upload = (data) => {
  return {
    type: "UPLOAD",
    payload: axios({
      method: "POST",
      url: `${API}/upload`,
      data,
      headers: {
        "content-type": "multipart/form-data",
      },
    }),
  };
};

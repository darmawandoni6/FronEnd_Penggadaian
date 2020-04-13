import axios from "axios";
import { API, headerAutorization } from "../utilities/API";

export const getNasabah = () => {
  return {
    type: "GET_NASABAH",
    payload: axios({
      method: "GET",
      url: `${API}/nasabah`,
      headers: headerAutorization,
    }),
  };
};

export const getNasabahBrowse = () => {
  return {
    type: "GET_NAS_BROWSE",
    payload: axios({
      method: "GET",
      url: `${API}/browse-nasabah`,
      headers: headerAutorization,
    }),
  };
};

export const searchNasabah = (KTP) => {
  return {
    type: "GET_NASABAH_D",
    payload: axios({
      method: "GET",
      url: `${API}/nasabah/${KTP}`,
      headers: headerAutorization,
    }),
  };
};

export const updateStatus = (data) => {
  return {
    type: "UPDATE_STATUS",
    payload: axios({
      method: "PATCH",
      url: `${API}/update-status`,
      headers: headerAutorization,
      data,
    }),
  };
};

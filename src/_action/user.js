import axios from "axios";
import { API, headerAutorization } from "../utilities/API";

export const signIn = (data) => {
  return {
    type: "LOGIN",
    payload: axios({
      method: "POST",
      url: `${API}/login`,
      headers: headerAutorization,
      data,
    }),
  };
};
export const signUP = (data) => {
  return {
    type: "REGISTER",
    payload: axios({
      method: "POST",
      url: `${API}/register`,
      headers: headerAutorization,
      data,
    }),
  };
};

export const cekUser = () => {
  return {
    type: "GET_CEK_USER",
    payload: axios({
      method: "GET",
      url: `${API}/cekuser`,
      headers: headerAutorization,
    }),
  };
};

export const updateFoto = (data) => {
  return {
    type: "UP_USER",
    payload: axios({
      method: "PATCH",
      url: `${API}/foto`,
      headers: headerAutorization,
      data,
    }),
  };
};

export const updatePassword = (data) => {
  return {
    type: "UP_PASS",
    payload: axios({
      method: "PATCH",
      url: `${API}/update-password`,
      headers: headerAutorization,
      data,
    }),
  };
};

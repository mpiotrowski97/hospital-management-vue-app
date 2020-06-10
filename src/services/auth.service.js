import {API_URL} from "../common/config";
import axios from "axios";

const authService = {
  login: (email, password) => {
    return axios.get(`${API_URL}/user`, {
      headers: {
        authorization: `Basic ${btoa(`${email}:${password}`)}`
      }
    });
  },
  check: () => {
    return axios.get(`${API_URL}/user`);
  },
  logout: () => {
    return axios.post(`${API_URL}/logout`);
  }
};

export default authService;

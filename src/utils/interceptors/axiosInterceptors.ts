import axios from "axios";
import toastr from "toastr";
import { loadToken, storeToken } from "../../store/authStorage";
import TokenService from "../../services/tokenService";
import {
  decreaseRequestCount,
  increaseRequestCount,
} from "../../store/slices/loadingSlice";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

let store: any;

export const injectStore = (_store: any) => {
  store = _store;
};

axiosInstance.interceptors.request.use(config => {
  let authToken = TokenService.getToken();
  if (authToken) config.headers.Authorization = "Bearer " + authToken;

  store.dispatch(increaseRequestCount());

  return config;
});

axiosInstance.interceptors.response.use(
  value => {
    store.dispatch(decreaseRequestCount());
    return value;
  },
  error => {
    store.dispatch(decreaseRequestCount());
    if (error.response.data === "Bad credentials") {
      toastr.error("No such user found!");
    } else if (error.response.data.message) {
      toastr.error(error.response.data.message);
    } else {
      toastr.error(error.response.data);
    }
    return error;
  }
);

let authToken = loadToken();

export function setToken(token?: any) {
  authToken = token;
  storeToken(token);
}

export default axiosInstance;

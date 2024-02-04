import axios from "axios";
import toastr from "toastr";
import { loadToken, storeToken } from "../../store/authStorage";
import TokenService from "../../services/tokenService";
import {
  decreaseRequestCount,
  increaseRequestCount,
} from "../../store/slices/loadingSlice";
import { store } from "../../store/configureStore";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

axiosInstance.interceptors.request.use(config => {
  let authToken = TokenService.getToken();
  if (authToken) config.headers.Authorization = `Bearer ${authToken}`;

  store.dispatch(increaseRequestCount());

  return config;
});

axiosInstance.interceptors.response.use(
  value => {
    store.dispatch(decreaseRequestCount());
    console.log("Başarılı bir cevap alındı..");
    return value;
  },
  error => {
    store.dispatch(decreaseRequestCount());
    toastr.error(error.response.data.message);
    return error;
  }
);

let authToken = loadToken();

export function setToken(token?: any) {
  authToken = token;
  storeToken(token);
}

export default axiosInstance;

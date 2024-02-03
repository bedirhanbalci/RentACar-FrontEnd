import axios from "axios";
import toastr from "toastr";
import { loadToken, storeToken } from "../../store/authStorage";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

axiosInstance.interceptors.request.use(config => {
  if (authToken) config.headers.Authorization = `Bearer ${authToken}`;

  return config;
});

axiosInstance.interceptors.response.use(
  value => {
    console.log("Başarılı bir cevap alındı..");
    return value;
  },
  error => {
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

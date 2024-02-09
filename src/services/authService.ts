import { LoginRequest } from "../models/auth/requests/LoginRequest";
import { RegisterRequest } from "../models/auth/requests/RegisterRequest";
import { IndividualRegisterForm } from "../pages/IndividualRegister/IndividualRegister";
import axiosInstance from "../utils/interceptors/axiosInterceptors";

class AuthService {
  register(registerRequest: RegisterRequest) {
    return axiosInstance.post("auth/register", registerRequest);
  }

  login(loginRequest: LoginRequest) {
    return axiosInstance.post("auth/login", loginRequest);
  }

  individualRegister(individualRequest: IndividualRegisterForm) {
    return axiosInstance.post("auth/individualRegister", individualRequest);
  }
}

export default new AuthService();

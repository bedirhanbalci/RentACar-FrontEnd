import { LoginRequest } from "../models/auth/requests/LoginRequest";
import { RegisterRequest } from "../models/auth/requests/RegisterRequest";
import axiosInstance from "../utils/interceptors/axiosInterceptors";

class AuthService {
  register(registerRequest: RegisterRequest) {
    return axiosInstance.post("auth/register", registerRequest);
  }

  login(loginRequest: LoginRequest) {
    return axiosInstance.post("auth/login", loginRequest);
  }
}

export default new AuthService();

import axiosInstance from "../utils/interceptors/axiosInterceptors";
import { RegisterRequest } from "../models/auth/requests/registerRequest";
import { LoginRequest } from "../models/auth/requests/loginRequest";

class AuthService {
  register(registerRequest: RegisterRequest) {
    return axiosInstance.post("auth/register", registerRequest);
  }

  login(loginRequest: LoginRequest) {
    return axiosInstance.post("auth/login", loginRequest);
  }
}

export default new AuthService();

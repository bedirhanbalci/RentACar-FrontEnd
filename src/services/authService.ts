import { LoginRequest } from "../models/auth/requests/LoginRequest";
import { RegisterRequest } from "../models/auth/requests/RegisterRequest";
import { CorporateLoginRequest } from "../models/auth/requests/CorporateLoginRequest";
import { IndividualLoginRequest } from "../models/auth/requests/IndividualLoginRequest";
import { CorporateRegisterForm } from "../pages/CorporateRegister/CorporateRegister";
import { IndividualRegisterForm } from "../pages/IndividualRegister/IndividualRegister";
import axiosInstance from "../utils/interceptors/axiosInterceptors";

class AuthService {
  register(registerRequest: RegisterRequest) {
    return axiosInstance.post("auth/register", registerRequest);
  }

  login(loginRequest: LoginRequest) {
    return axiosInstance.post("auth/login", loginRequest);
  }

  individualLogin(individualLoginRequest: IndividualLoginRequest) {
    return axiosInstance.post("auth/individualLogin", individualLoginRequest);
  }

  corporateLogin(corporateLoginRequest: CorporateLoginRequest) {
    return axiosInstance.post("auth/corporateLogin", corporateLoginRequest);
  }

  individualRegister(individualRequest: IndividualRegisterForm) {
    return axiosInstance.post("auth/individualRegister", individualRequest);
  }

  corporateRegister(corporateRequest: CorporateRegisterForm) {
    return axiosInstance.post("auth/corporateRegister", corporateRequest);
  }
}

export default new AuthService();

import { AddUserRequest } from "../models/user/requests/AddUserRequest";
import { UpdateUserRequest } from "../models/user/requests/UpdateUserRequest";
import { GetAllUsersResponse } from "../models/user/responses/GetAllUsersResponse";
import { GetByIdUserResponse } from "../models/user/responses/GetByIdUserResponse";
import { AddUserResponse } from "../models/user/responses/AddUserResponse";
import { UpdateUserResponse } from "../models/user/responses/UpdateUserResponse";
import { BaseService } from "./baseService";

class UserService extends BaseService<
  GetAllUsersResponse,
  GetByIdUserResponse,
  AddUserRequest,
  AddUserResponse,
  UpdateUserRequest,
  UpdateUserResponse
> {
  constructor() {
    super();
    this.apiUrl = "users";
  }
}

export default new UserService();

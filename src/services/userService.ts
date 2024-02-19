import { AddUserRequest } from "../models/user/requests/addUserRequest";
import { UpdateUserRequest } from "../models/user/requests/updateUserRequest";
import { GetAllUsersResponse } from "../models/user/responses/getAllUsersResponse";
import { GetByIdUserResponse } from "../models/user/responses/getByIdUserResponse";
import { AddUserResponse } from "../models/user/responses/addUserResponse";
import { UpdateUserResponse } from "../models/user/responses/updateUserResponse";
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

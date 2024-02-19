import { AddColorRequest } from "../models/color/requests/AddColorRequest";
import { UpdateColorRequest } from "../models/color/requests/UpdateColorRequest";
import { GetAllColorsResponse } from "../models/color/responses/GetAllColorsResponse";
import { GetByIdColorResponse } from "../models/color/responses/GetByIdColorResponse";
import { AddColorResponse } from "../models/color/responses/AddColorResponse";
import { UpdateColorResponse } from "../models/color/responses/UpdateColorResponse";
import { BaseService } from "./baseService";

class ColorService extends BaseService<
  GetAllColorsResponse,
  GetByIdColorResponse,
  AddColorRequest,
  AddColorResponse,
  UpdateColorRequest,
  UpdateColorResponse
> {
  constructor() {
    super();
    this.apiUrl = "colors";
  }
}

export default new ColorService();

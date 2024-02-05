import { AddColorRequest } from "../models/color/requests/addColorRequest";
import { UpdateColorRequest } from "../models/color/requests/updateColorRequest";
import { GetAllColorsResponse } from "../models/color/responses/getAllColorsResponse";
import { GetByIdColorResponse } from "../models/color/responses/getByIdColorResponse";
import { AddColorResponse } from "../models/color/responses/addColorResponse";
import { UpdateColorResponse } from "../models/color/responses/updateColorResponse";
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

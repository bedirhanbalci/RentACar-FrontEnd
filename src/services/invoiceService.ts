import { AddInvoiceRequest } from "../models/invoice/requests/addInvoiceRequest";
import { UpdateInvoiceRequest } from "../models/invoice/requests/updateInvoiceRequest";
import { GetAllInvoicesResponse } from "../models/invoice/responses/getAllInvoicesResponse";
import { GetByIdInvoiceResponse } from "../models/invoice/responses/getByIdInvoiceResponse";
import { AddInvoiceResponse } from "../models/invoice/responses/addInvoiceResponse";
import { UpdateInvoiceResponse } from "../models/invoice/responses/updateInvoiceResponse";
import { BaseService } from "./baseService";

class InvoiceService extends BaseService<
  GetAllInvoicesResponse,
  GetByIdInvoiceResponse,
  AddInvoiceRequest,
  AddInvoiceResponse,
  UpdateInvoiceRequest,
  UpdateInvoiceResponse
> {
  constructor() {
    super();
    this.apiUrl = "invoices";
  }
}

export default new InvoiceService();

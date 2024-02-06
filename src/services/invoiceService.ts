import { AddInvoiceRequest } from "../models/invoice/requests/AddInvoiceRequest";
import { UpdateInvoiceRequest } from "../models/invoice/requests/UpdateInvoiceRequest";
import { GetAllInvoicesResponse } from "../models/invoice/responses/GetAllInvoicesResponse";
import { GetByIdInvoiceResponse } from "../models/invoice/responses/GetByIdInvoiceResponse";
import { AddInvoiceResponse } from "../models/invoice/responses/AddInvoiceResponse";
import { UpdateInvoiceResponse } from "../models/invoice/responses/UpdateInvoiceResponse";
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

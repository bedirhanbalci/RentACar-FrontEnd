import { AddIndividualCustomerRequest } from "../models/individualCustomer/requests/AddIndividualCustomerRequest";
import { UpdateIndividualCustomerRequest } from "../models/individualCustomer/requests/UpdateIndividualCustomerRequest";
import { AddIndividualCustomerResponse } from "../models/individualCustomer/responses/AddIndividualCustomerResponse";
import { GetAllIndividualCustomersResponse } from "../models/individualCustomer/responses/GetAllIndividualCustomersResponse";
import { GetByIdIndividualCustomerResponse } from "../models/individualCustomer/responses/GetByIdIndividualCustomerResponse";
import { UpdateIndividualCustomerResponse } from "../models/individualCustomer/responses/UpdateIndividualCustomerResponse";
import { BaseService } from "./baseService";

class IndividualCustomerService extends BaseService<
  GetAllIndividualCustomersResponse,
  GetByIdIndividualCustomerResponse,
  AddIndividualCustomerRequest,
  AddIndividualCustomerResponse,
  UpdateIndividualCustomerRequest,
  UpdateIndividualCustomerResponse
> {
  constructor() {
    super();
    this.apiUrl = "individualCustomers";
  }
}

export default new IndividualCustomerService();

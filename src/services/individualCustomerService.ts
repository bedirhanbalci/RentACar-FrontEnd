import { AddIndividualCustomerRequest } from "../models/individualCustomer/requests/addIndividualCustomerRequest";
import { UpdateIndividualCustomerRequest } from "../models/individualCustomer/requests/updateIndividualCustomerRequest";
import { AddIndividualCustomerResponse } from "../models/individualCustomer/responses/addIndividualCustomerResponse";
import { GetAllIndividualCustomersResponse } from "../models/individualCustomer/responses/getAllIndividualCustomersResponse";
import { GetByIdIndividualCustomerResponse } from "../models/individualCustomer/responses/getByIdIndividualCustomerResponse";
import { UpdateIndividualCustomerResponse } from "../models/individualCustomer/responses/updateIndividualCustomerResponse";
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

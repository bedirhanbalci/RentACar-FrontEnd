export interface UpdateInvoiceRequest {
  id: number;
  invoiceNo: string;
  taxRate: number;
  rentalId: number;
}

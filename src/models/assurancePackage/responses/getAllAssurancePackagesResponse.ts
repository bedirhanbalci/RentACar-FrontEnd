export interface GetAllAssurancePackagesResponse {
  id: number;
  name: string;
  detail: string;
  dailyPrice: number;
  totalPrice: number;
  addible?: boolean;
  imagePath?: string;
}

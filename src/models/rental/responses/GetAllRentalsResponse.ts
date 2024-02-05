export interface GetAllRentalsResponse {
  id: number;
  startDate: string;
  endDate: string;
  returnDate: string;
  startKilometer: number;
  endKilometer: number;
  totalPrice: number;
  discountRate: number;
  generalPrice: number;
  carPlate: string;
  userEmail: string;
  assurancePackageName: string;
  additionalFeatureName: string;
}

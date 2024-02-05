export interface UpdateRentalRequest {
  id: number;
  startDate: string;
  endDate: string;
  returnDate: string;
  endKilometer: number;
  carId: number;
  userId: number;
  assurancePackageId: number;
  additionalFeatureId: number;
}

export interface AddRentalRequest {
  startDate: string;
  endDate: string;
  carId: number;
  userId: number;
  assurancePackageId: number;
  additionalFeatureId: number;
}

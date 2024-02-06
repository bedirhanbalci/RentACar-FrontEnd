export interface UpdateCarRequest {
  id: number;
  kilometer: number;
  plate: string;
  year: number;
  dailyPrice: number;
  imagePath: string;
  gearType: string;
  fuelType: string;
  bodyType: string;
  modelId: number;
  colorId: number;
  branchId: number;
}

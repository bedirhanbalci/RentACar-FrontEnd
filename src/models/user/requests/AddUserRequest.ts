export interface AddUserRequest {
  email: string;
  password: string;
  phoneNumber: string;
  address?: string;
  imagePath: string;
}

export interface UpdateUserRequest {
  id?: number;
  email?: string;
  password?: string;
  phoneNumber?: string;
  address?: string;
  imagePath?: string;
  companyName?: string;
  contactName?: string;
  contactTitle?: string;
  taxNumber?: string;
  firstName?: string;
  lastName?: string;
  nationalityNo?: string;
  birthDate?: string;
  rows?: number;
}

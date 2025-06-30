export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin'| 'associationOwner'| 'volunteer'
  isActive: boolean;
  gender?: 'MALE' | 'FEMALE';
  age?: number;
  profilePicture?: string;
  city?: string;
  country?: string;
  createdAt?: string;
  updatedAt?: string;
}



export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  createdAt?: string;
  updatedAt?: string;
}

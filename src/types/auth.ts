export type UserRole = 'admin' | 'editor' | 'user';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AuthError {
  code: string;
  message: string;
} 
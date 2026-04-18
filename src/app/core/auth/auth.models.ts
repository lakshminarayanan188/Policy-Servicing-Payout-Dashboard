export type UserRole = 'VIEWER' | 'OPERATOR' | 'ADMIN';

export interface User {
  id: string;
  username: string;
  displayName: string;
  role: UserRole;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

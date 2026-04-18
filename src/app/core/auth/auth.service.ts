import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginRequest, LoginResponse, User } from './auth.models';

const DEMO_USERS: { [key: string]: { password: string; user: User } } = {
  viewer: { password: 'viewer123', user: { id: '1', username: 'viewer', displayName: 'Ramya V', role: 'VIEWER' } },
  operator: { password: 'operator123', user: { id: '2', username: 'operator', displayName: 'Karthik S', role: 'OPERATOR' } },
  admin: { password: 'admin123', user: { id: '3', username: 'admin', displayName: 'Priya A', role: 'ADMIN' } }
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'ps_token';
  private readonly USER_KEY = 'ps_user';

  currentUser$ = new BehaviorSubject<User | null>(this.loadUser());

  login(req: LoginRequest): LoginResponse | null {
    const entry = DEMO_USERS[req.username.toLowerCase()];
    if (!entry || entry.password !== req.password) return null;
    const token = btoa(`${req.username}:${Date.now()}`);
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(entry.user));
    this.currentUser$.next(entry.user);
    return { token, user: entry.user };
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUser$.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  hasRole(...roles: string[]): boolean {
    const user = this.currentUser$.value;
    return !!user && roles.includes(user.role);
  }

  private loadUser(): User | null {
    try {
      const raw = localStorage.getItem(this.USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }
}

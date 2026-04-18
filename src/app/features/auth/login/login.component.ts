import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-bg">
      <div class="login-card">
        <div class="login-logo">
          <span class="logo-mark">PS</span>
          <h1>PolicyServ</h1>
          <p>Policy Servicing Dashboard</p>
        </div>
        <p-message *ngIf="error" severity="error" [text]="error" styleClass="w-full mb-3"></p-message>
        <div class="field">
          <span class="p-float-label">
            <input pInputText id="username" [(ngModel)]="username" class="w-full" />
            <label for="username">Username</label>
          </span>
        </div>
        <div class="field">
          <span class="p-float-label">
            <input type="password" id="password" pPassword [(ngModel)]="password" [feedback]="false" class="w-full" />
            <label for="password">Password</label>
          </span>
        </div>
        <button pButton label="Sign In" icon="pi pi-sign-in" class="w-full" (click)="login()" [disabled]="loading"></button>
        <div class="demo-creds">
          <p><strong>Demo credentials:</strong></p>
          <p>viewer / viewer123 &nbsp;|&nbsp; operator / operator123 &nbsp;|&nbsp; admin / admin123</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-bg { min-height:100vh; background:linear-gradient(135deg,#1A2B4C 0%,#0EA5A0 100%); display:flex; align-items:center; justify-content:center; }
    .login-card { background:#fff; border-radius:12px; padding:40px; width:100%; max-width:400px; box-shadow:0 20px 60px rgba(0,0,0,.2); }
    .login-logo { text-align:center; margin-bottom:32px; }
    .logo-mark { display:inline-flex; align-items:center; justify-content:center; width:52px; height:52px; background:#0EA5A0; color:#fff; font-weight:700; font-size:18px; border-radius:10px; margin-bottom:12px; }
    h1 { font-size:22px; font-weight:700; color:#1E293B; margin:0 0 4px; }
    p { color:#64748B; font-size:13px; margin:0; }
    .field { margin-bottom:20px; }
    :host ::ng-deep .w-full { width:100%; }
    :host ::ng-deep .p-password { width:100%; }
    :host ::ng-deep .p-password input { width:100%; }
    .demo-creds { margin-top:20px; padding:12px; background:#F8FAFC; border-radius:6px; font-size:12px; color:#64748B; line-height:1.6; }
    .demo-creds strong { color:#1E293B; }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  login(): void {
    this.error = '';
    this.loading = true;
    setTimeout(() => {
      const result = this.auth.login({ username: this.username, password: this.password });
      this.loading = false;
      if (result) { this.router.navigate(['/dashboard']); }
      else { this.error = 'Invalid username or password'; }
    }, 400);
  }
}

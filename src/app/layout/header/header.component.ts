import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-header',
  template: `
    <header class="app-header">
      <div class="header-title">Policy Servicing Dashboard</div>
      <div class="header-right">
        <ng-container *ngIf="auth.currentUser$ | async as user">
          <span class="user-name">{{ user.displayName }}</span>
          <span class="role-badge" [ngClass]="roleSeverity(user.role)">{{ user.role }}</span>
        </ng-container>
        <button pButton icon="pi pi-sign-out" class="p-button-secondary p-button-text" (click)="logout()" pTooltip="Logout"></button>
      </div>
    </header>
  `,
  styles: [`
    .app-header { display:flex; align-items:center; justify-content:space-between; padding:0 20px; height:56px; background:#fff; border-bottom:1px solid #E2E8F0; box-shadow:0 1px 3px rgba(0,0,0,.06); }
    .header-title { font-weight:700; font-size:16px; color:#1E293B; }
    .header-right { display:flex; align-items:center; gap:12px; }
    .user-name { font-size:14px; color:#475569; }
    .role-badge { padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
    .role-badge.danger { background: #FEE2E2; color: #991B1B; }
    .role-badge.warn { background: #FEF3C7; color: #92400E; }
    .role-badge.info { background: #DBEAFE; color: #1E40AF; }
    .role-badge.secondary { background: #F1F5F9; color: #475569; }
  `]
})
export class HeaderComponent {
  constructor(public auth: AuthService, private router: Router) {}

  roleSeverity(role: string): string {
    const map: any = { ADMIN: 'danger', OPERATOR: 'warn', VIEWER: 'info' };
    return map[role] || 'secondary';
  }

  logout(): void { this.auth.logout(); this.router.navigate(['/login']); }
}

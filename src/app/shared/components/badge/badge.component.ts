import { Component, Input, Output, EventEmitter } from '@angular/core';

type Status = 'SUCCESS' | 'FAILED' | 'RUNNING' | 'IDLE' | 'DISABLED' | 'HOLD' | 'ACTIVE';

@Component({
  selector: 'app-badge',
  template: `
    <span class="badge-wrap">
      <span class="custom-badge" [ngClass]="severity">{{ label }}</span>
      <span class="pulse-dot" *ngIf="status === 'RUNNING'"></span>
    </span>
  `,
  styles: [`
    .badge-wrap { display: inline-flex; align-items: center; gap: 6px; }
    .custom-badge { padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
    .custom-badge.success { background: #DCFCE7; color: #166534; }
    .custom-badge.danger { background: #FEE2E2; color: #991B1B; }
    .custom-badge.info { background: #DBEAFE; color: #1E40AF; }
    .custom-badge.warn { background: #FEF3C7; color: #92400E; }
    .custom-badge.secondary { background: #F1F5F9; color: #475569; }
    .pulse-dot { width: 8px; height: 8px; border-radius: 50%; background: #3B82F6; animation: pulse 1.5s infinite; }
    .badge-wrap { display: inline-flex; align-items: center; gap: 6px; }
    .pulse-dot { width: 8px; height: 8px; border-radius: 50%; background: #22C55E; animation: pulse 1.5s infinite; }
    @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.4)} }
  `]
})
export class BadgeComponent {
  @Input() status: Status = 'IDLE';

  get label(): string {
    const map: Record<Status, string> = { SUCCESS: 'Success', FAILED: 'Failed', RUNNING: 'Running', IDLE: 'Idle', DISABLED: 'Disabled', HOLD: 'Hold', ACTIVE: 'Active' };
    return map[this.status] || this.status;
  }

  get severity(): string {
    const map: Record<Status, string> = { SUCCESS: 'success', FAILED: 'danger', RUNNING: 'info', IDLE: 'secondary', DISABLED: 'warn', HOLD: 'warn', ACTIVE: 'success' };
    return map[this.status] || 'secondary';
  }
}

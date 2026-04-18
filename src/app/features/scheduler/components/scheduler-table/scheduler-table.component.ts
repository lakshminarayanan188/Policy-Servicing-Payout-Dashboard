import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SchedulerService } from '../../scheduler.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { Scheduler } from '../../../../core/mock/mock-data';

@Component({
  selector: 'app-scheduler-table',
  template: `
    <p-table [value]="schedulers" styleClass="p-datatable-sm p-datatable-striped p-datatable-gridlines"
      [scrollable]="true" scrollHeight="flex">
      <ng-template pTemplate="header">
        <tr>
          <th>Name</th>
          <th>Module</th>
          <th>Status</th>
          <th>Last Run</th>
          <th>Next Run</th>
          <th>Frequency</th>
          <th>Records</th>
          <th>Duration</th>
          <th>Actions</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-s let-i="rowIndex">
        <tr class="fade-row">
          <td>
            <div class="sch-name">{{ s.name }}</div>
            <div class="sch-class">{{ s.jobClass }}</div>
          </td>
          <td><span class="module-tag">{{ s.module }}</span></td>
          <td><app-badge [status]="s.status"></app-badge></td>
          <td>
            <div>{{ s.lastRunTime | relativeTime }}</div>
            <app-badge *ngIf="s.lastRunStatus" [status]="s.lastRunStatus"></app-badge>
          </td>
          <td>{{ s.nextRunTime ? (s.nextRunTime | relativeTime) : '—' }}</td>
          <td>
            <app-cron-editor [cron]="s.cronExpression" (cronChange)="saveCron(s, $event)"></app-cron-editor>
          </td>
          <td>{{ s.recordsProcessed | number }}</td>
          <td>{{ formatDur(s.durationMs) }}</td>
          <td>
            <div class="actions">
              <button *ngIf="auth.hasRole('OPERATOR', 'ADMIN')" pButton icon="pi pi-play"
                class="p-button-success p-button-sm" pTooltip="Run Now"
                [disabled]="s.status === 'RUNNING'" (click)="trigger(s)"></button>
              <button pButton icon="pi pi-history"
                class="p-button-info p-button-sm" pTooltip="Run History"
                (click)="historyClick.emit(s)"></button>
              <p-checkbox *ngIf="auth.hasRole('ADMIN')" [(ngModel)]="s.enabled" [binary]="true" (onChange)="toggle(s)" [pTooltip]="s.enabled ? 'Disable' : 'Enable'"></p-checkbox>
            </div>
          </td>
        </tr>
        <tr class="error-row" *ngIf="s.errorMessage">
          <td colspan="9"><i class="pi pi-exclamation-triangle" style="color:#DC2626"></i> {{ s.errorMessage }}</td>
        </tr>
      </ng-template>
    </p-table>
  `,
  styles: [`
    .sch-name { font-weight:600; font-size:13px; }
    .sch-class { font-size:11px; color:#64748B; font-family:monospace; }
    .module-tag { background:#EFF6FF; color:#1D4ED8; padding:2px 8px; border-radius:12px; font-size:12px; font-weight:600; }
    .actions { display:flex; gap:6px; align-items:center; }
    .error-row td { background:#FEF2F2; font-size:12px; color:#991B1B; padding:4px 8px; }
    .fade-row { animation: fadeIn 0.3s ease both; }
    @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
  `]
})
export class SchedulerTableComponent {
  @Input() schedulers: Scheduler[] = [];
  @Output() historyClick = new EventEmitter<Scheduler>();

  constructor(
    private svc: SchedulerService,
    public auth: AuthService,
    private msg: MessageService
  ) {}

  trigger(s: Scheduler): void {
    this.svc.trigger(s.id).subscribe(() => {
      s.status = 'RUNNING'; s.lastRunStatus = 'RUNNING';
      this.msg.add({ severity: 'success', summary: 'Triggered', detail: `${s.name} started` });
    });
  }

  toggle(s: Scheduler): void {
    this.svc.toggle(s.id).subscribe(updated => {
      s.status = updated.status;
      this.msg.add({ severity: 'info', summary: s.enabled ? 'Enabled' : 'Disabled', detail: s.name });
    });
  }

  saveCron(s: Scheduler, cron: string): void {
    this.svc.updateCron(s.id, cron).subscribe(() => {
      s.cronExpression = cron;
      this.msg.add({ severity: 'success', summary: 'Cron Updated', detail: s.name });
    });
  }

  formatDur(ms: number): string {
    if (!ms) return '—';
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${Math.floor(ms / 60000)}m ${Math.floor((ms % 60000) / 1000)}s`;
  }
}

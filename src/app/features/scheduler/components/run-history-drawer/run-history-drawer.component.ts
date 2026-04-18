import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { SchedulerService } from '../../scheduler.service';
import { RunHistory } from '../../../../core/mock/mock-data';

@Component({
  selector: 'app-run-history-drawer',
  template: `
    <p-sidebar [(visible)]="visible" position="right" [style]="{width:'480px'}" (onHide)="visibleChange.emit(false)">
      <h3>Run History</h3>
      <div class="p-4 text-center" *ngIf="loading">Loading...</div>
      <ul class="history-list" *ngIf="!loading">
        <li class="history-item" *ngFor="let h of history; trackBy: trackById">
          <div class="history-header">
            <app-badge [status]="h.status"></app-badge>
            <span class="history-time">{{ h.startTime | relativeTime }}</span>
          </div>
          <div class="history-meta">
            <span>Duration: {{ formatDur(h.durationMs) }}</span>
            <span>Records: {{ h.recordsProcessed | number }}</span>
          </div>
          <div class="history-error" *ngIf="h.errorMessage">{{ h.errorMessage }}</div>
        </li>
      </ul>
    </p-sidebar>
  `,
  styles: [`
    .history-list { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:12px; }
    .history-item { padding:12px; border:1px solid #E2E8F0; border-radius:8px; }
    .history-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; }
    .history-time { font-size:12px; color:#64748B; }
    .history-meta { display:flex; gap:16px; font-size:12px; color:#475569; margin-bottom:4px; }
    .history-error { font-size:11px; color:#DC2626; background:#FEE2E2; padding:6px 8px; border-radius:4px; margin-top:4px; word-break:break-word; }
  `]
})
export class RunHistoryDrawerComponent implements OnChanges {
  @Input() visible = false;
  @Input() schedulerId = '';
  @Output() visibleChange = new EventEmitter<boolean>();

  history: RunHistory[] = [];
  loading = false;

  constructor(private svc: SchedulerService) {}

  ngOnChanges(): void { if (this.visible && this.schedulerId) { this.load(); } }

  private load(): void {
    this.loading = true;
    this.svc.getHistory(this.schedulerId, 10).subscribe(h => { this.history = h; this.loading = false; });
  }

  trackById(_: number, h: RunHistory): string { return h.id; }

  formatDur(ms: number): string {
    if (!ms) return '—';
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${Math.floor(ms / 60000)}m ${Math.floor((ms % 60000) / 1000)}s`;
  }
}

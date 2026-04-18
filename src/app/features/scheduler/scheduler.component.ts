import { Component, OnInit } from '@angular/core';
import { SchedulerService } from './scheduler.service';
import { SchedulerFilter } from './components/scheduler-filters/scheduler-filters.component';
import { Scheduler } from '../../core/mock/mock-data';

@Component({
  selector: 'app-scheduler',
  template: `
    <div class="sch-page">
      <div class="page-header">
        <h2 class="page-title">Scheduler Management</h2>
        <span class="sch-count">{{ filtered.length }} schedulers</span>
      </div>
      <app-scheduler-filters (filterChange)="onFilter($event)"></app-scheduler-filters>
      <div class="table-card">
        <app-scheduler-table [schedulers]="filtered" (historyClick)="openHistory($event)"></app-scheduler-table>
      </div>
      <app-run-history-drawer
        *ngIf="historyScheduler"
        [(visible)]="historyVisible"
        [schedulerId]="historyScheduler.id">
      </app-run-history-drawer>
    </div>
  `,
  styles: [`
    .sch-page { display:flex; flex-direction:column; gap:20px; }
    .page-header { display:flex; align-items:center; justify-content:space-between; }
    .page-title { font-size:20px; font-weight:700; color:#1E293B; margin:0; }
    .sch-count { font-size:13px; color:#64748B; }
    .table-card { background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,.06); }
  `]
})
export class SchedulerComponent implements OnInit {
  all: Scheduler[] = [];
  filtered: Scheduler[] = [];
  historyScheduler: Scheduler | null = null;
  historyVisible = false;

  constructor(private svc: SchedulerService) {}

  ngOnInit(): void { this.svc.getSchedulers().subscribe(s => { this.all = s; this.filtered = s; }); }

  onFilter(f: SchedulerFilter): void {
    this.filtered = this.all.filter(s =>
      (!f.search || s.name.toLowerCase().includes(f.search.toLowerCase())) &&
      (!f.status || s.status === f.status) &&
      (!f.module || s.module === f.module)
    );
  }

  openHistory(s: Scheduler): void { this.historyScheduler = s; this.historyVisible = true; }
}

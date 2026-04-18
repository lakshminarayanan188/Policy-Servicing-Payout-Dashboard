import { Component, Input, Output, EventEmitter, OnInit, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-stage-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="stage-card" [style.border-top-color]="color" (click)="cardClick.emit(stage)">
      <div class="card-header">
        <span class="stage-title">{{ stage }}</span>
        <span class="aging-badge" *ngIf="agingCount > 0" [class.aging-red]="agingCount > 10">{{ agingCount }} &gt;3d</span>
      </div>
      <div class="card-count" [style.color]="color">{{ displayCount }}</div>
      <div class="card-footer">
        <span class="change" [class.up]="pct >= 0" [class.down]="pct < 0">
          {{ pct >= 0 ? '↑' : '↓' }} {{ abs(pct) }}%
        </span>
        <div class="sparkline" *ngIf="sparklineData?.length">
          <p-chart type="line" [data]="chartData" [options]="chartOptions" height="40px"></p-chart>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stage-card { background:#fff; border-radius:8px; padding:16px; border-top:4px solid #ccc; cursor:pointer; transition:transform 0.2s,box-shadow 0.2s; box-shadow:0 1px 4px rgba(0,0,0,.08); }
    .stage-card:hover { transform:translateY(-2px); box-shadow:0 6px 16px rgba(0,0,0,.12); }
    .card-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }
    .stage-title { font-size:13px; font-weight:600; color:#64748B; text-transform:uppercase; letter-spacing:.5px; }
    .aging-badge { font-size:11px; padding:2px 7px; border-radius:12px; background:#FEF3C7; color:#92400E; font-weight:600; }
    .aging-red { background:#FEE2E2; color:#991B1B; }
    .card-count { font-size:36px; font-weight:700; line-height:1.1; margin-bottom:8px; }
    .card-footer { display:flex; align-items:center; justify-content:space-between; }
    .change { font-size:12px; font-weight:600; }
    .up { color:#16A34A; } .down { color:#DC2626; }
    .sparkline { width:80px; }
  `]
})
export class StageCardComponent implements OnInit, OnChanges {
  @Input() stage = '';
  @Input() count = 0;
  @Input() prevCount = 0;
  @Input() color = '#3B82F6';
  @Input() agingCount = 0;
  @Input() sparklineData: number[] = [];
  @Output() cardClick = new EventEmitter<string>();

  displayCount = 0;
  pct = 0;
  chartData: any;
  chartOptions: any;

  constructor(private cd: ChangeDetectorRef) {}

  abs(n: number): number { return Math.abs(n); }

  ngOnInit(): void { this.build(); this.animateCounter(); }
  ngOnChanges(): void { this.build(); }

  private build(): void {
    this.pct = this.prevCount > 0 ? Math.round(((this.count - this.prevCount) / this.prevCount) * 100) : 0;
    this.chartData = {
      labels: this.sparklineData.map((_, i) => `d${i}`),
      datasets: [{ data: this.sparklineData, borderColor: this.color, borderWidth: 1.5, pointRadius: 0, tension: 0.4, fill: false }]
    };
    this.chartOptions = { legend: { display: false }, tooltips: { enabled: false }, scales: { xAxes: [{ display: false }], yAxes: [{ display: false }] }, animation: { duration: 0 }, responsive: true, maintainAspectRatio: false };
  }

  private animateCounter(): void {
    const target = this.count;
    const steps = 30;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      this.displayCount = Math.round((step / steps) * target);
      if (step >= steps) { this.displayCount = target; clearInterval(interval); }
      this.cd.markForCheck();
    }, 800 / steps);
  }
}

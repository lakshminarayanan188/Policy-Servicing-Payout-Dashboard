import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StageCount } from '../../../../core/mock/mock-data';

@Component({
  selector: 'app-stage-grid',
  template: `
    <div class="stage-grid">
      <app-stage-card
        *ngFor="let s of stageCounts; trackBy: trackByStage"
        [stage]="s.stage"
        [count]="s.count"
        [prevCount]="s.prevCount"
        [color]="s.color"
        [agingCount]="s.agingCount"
        [sparklineData]="s.sparkline"
        (cardClick)="stageClick.emit($event)">
      </app-stage-card>
      <div class="stage-card total-card" (click)="stageClick.emit('all')">
        <div class="stage-title">Total Pending</div>
        <div class="card-count">{{ totalPending }}</div>
        <div class="change" [class.up]="totalPending >= prevTotal" [class.down]="totalPending < prevTotal">
          {{ totalPending >= prevTotal ? '↑' : '↓' }} vs yesterday
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stage-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
    .total-card { background:#1A2B4C; color:#fff; border-radius:8px; padding:16px; cursor:pointer; transition:transform .2s,box-shadow .2s; }
    .total-card:hover { transform:translateY(-2px); box-shadow:0 6px 16px rgba(0,0,0,.2); }
    .stage-title { font-size:13px; font-weight:600; color:rgba(255,255,255,.7); text-transform:uppercase; letter-spacing:.5px; margin-bottom:8px; }
    .card-count { font-size:36px; font-weight:700; color:#0EA5A0; }
    .change { font-size:12px; font-weight:600; margin-top:8px; }
    .up { color:#4ADE80; } .down { color:#F87171; }
    @media (max-width:900px) { .stage-grid { grid-template-columns:repeat(2,1fr); } }
  `]
})
export class StageGridComponent {
  @Input() stageCounts: StageCount[] = [];
  @Input() totalPending = 0;
  @Input() prevTotal = 0;
  @Output() stageClick = new EventEmitter<string>();

  trackByStage(_: number, s: StageCount): string { return s.stage; }
}

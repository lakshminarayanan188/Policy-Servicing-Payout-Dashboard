import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary-bar',
  template: `
    <div class="summary-bar">
      <div class="summary-item">
        <span class="label">Total Policies Today</span>
        <span class="value">{{ totalPolicies | number }}</span>
      </div>
      <div class="divider"></div>
      <div class="summary-item">
        <span class="label">Amount in Pipeline</span>
        <span class="value">₹ {{ amountInPipeline | number:'1.0-0' }}</span>
      </div>
      <div class="divider"></div>
      <div class="summary-item">
        <span class="label">SLA Breaches</span>
        <span class="value sla" [class.breach]="slaBreaches > 0">{{ slaBreaches }}</span>
      </div>
    </div>
  `,
  styles: [`
    .summary-bar { display:flex; align-items:center; background:#fff; border-radius:8px; padding:16px 24px; box-shadow:0 1px 4px rgba(0,0,0,.06); gap:24px; }
    .summary-item { display:flex; flex-direction:column; gap:2px; }
    .label { font-size:12px; color:#64748B; font-weight:500; text-transform:uppercase; letter-spacing:.5px; }
    .value { font-size:22px; font-weight:700; color:#1E293B; }
    .value.sla { color:#16A34A; }
    .value.sla.breach { color:#DC2626; }
    .divider { width:1px; height:36px; background:#E2E8F0; }
  `]
})
export class SummaryBarComponent {
  @Input() totalPolicies = 0;
  @Input() amountInPipeline = 0;
  @Input() slaBreaches = 0;
}

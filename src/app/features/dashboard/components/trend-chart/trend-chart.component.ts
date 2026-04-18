import { Component, Input, OnChanges } from '@angular/core';
import { TrendPoint } from '../../../../core/mock/mock-data';

@Component({
  selector: 'app-trend-chart',
  template: `
    <div class="chart-card">
      <h3 class="chart-title">7-Day Stage Trend</h3>
      <p-chart type="line" [data]="chartData" [options]="chartOptions" height="260px"></p-chart>
    </div>
  `,
  styles: [`
    .chart-card { background:#fff; border-radius:8px; padding:20px; box-shadow:0 1px 4px rgba(0,0,0,.06); }
    .chart-title { font-size:15px; font-weight:600; color:#1E293B; margin:0 0 16px; }
  `]
})
export class TrendChartComponent implements OnChanges {
  @Input() trendData: TrendPoint[] = [];

  chartData: any = {};
  chartOptions: any = {};

  ngOnChanges(): void { this.build(); }

  private build(): void {
    const labels = this.trendData.map(d => d.date.slice(5));
    const mk = (label: string, key: keyof TrendPoint, color: string) => ({
      label, data: this.trendData.map(d => d[key] as number),
      borderColor: color, backgroundColor: color + '22',
      borderWidth: 2, pointRadius: 3, tension: 0.4, fill: false
    });
    this.chartData = {
      labels,
      datasets: [
        mk('Extract',     'extract',    '#3B82F6'),
        mk('Approve',     'approve',    '#6366F1'),
        mk('Tech Bucket', 'techBucket', '#F59E0B'),
        mk('Sanction',    'sanction',   '#F97316'),
        mk('Paid',        'paid',       '#22C55E')
      ]
    };
    this.chartOptions = {
      legend: { position: 'bottom' },
      scales: {
        xAxes: [{ gridLines: { display: false } }],
        yAxes: [{ ticks: { beginAtZero: true } }]
      },
      responsive: true,
      maintainAspectRatio: false
    };
  }
}

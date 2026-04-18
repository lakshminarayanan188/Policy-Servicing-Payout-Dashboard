import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardService } from './dashboard.service';
import { FilterChange } from '../../shared/components/filter-bar/filter-bar.component';
import { DashboardFilters } from '../../core/mock/mock-dashboard.service';
import { Module, Product, TrendPoint } from '../../core/mock/mock-data';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard">
      <div class="page-header">
        <h2 class="page-title">Dashboard</h2>
        <app-countdown-timer [seconds]="30" (tick)="refresh()"></app-countdown-timer>
      </div>

      <app-filter-bar
        [modules]="modules"
        [products]="products"
        (moduleSelected)="loadProducts($event)"
        (filterChange)="onFilterChange($event)">
      </app-filter-bar>

      <div class="section" *ngIf="stageCounts">
        <app-summary-bar
          [totalPolicies]="stageCounts.totalPoliciesTODAY"
          [amountInPipeline]="stageCounts.amountInPipeline"
          [slaBreaches]="stageCounts.slaBreaches">
        </app-summary-bar>
      </div>

      <div class="section" *ngIf="stageCounts">
        <app-stage-grid
          [stageCounts]="stageCounts.counts"
          [totalPending]="stageCounts.totalPending"
          [prevTotal]="stageCounts.prevTotalPending"
          (stageClick)="openDrill($event)">
        </app-stage-grid>
      </div>

      <div class="section" *ngIf="trendData.length">
        <app-trend-chart [trendData]="trendData"></app-trend-chart>
      </div>

      <app-drill-down-dialog
        *ngIf="drillStage"
        [(visible)]="drillVisible"
        [stage]="drillStage"
        [filters]="currentFilters">
      </app-drill-down-dialog>
    </div>
  `,
  styles: [`
    .dashboard { display:flex; flex-direction:column; gap:20px; }
    .page-header { display:flex; align-items:center; justify-content:space-between; }
    .page-title { font-size:20px; font-weight:700; color:#1E293B; margin:0; }
    .section { display:flex; flex-direction:column; gap:16px; }
  `]
})
export class DashboardComponent implements OnInit, OnDestroy {
  modules: Module[] = [];
  products: Product[] = [];
  stageCounts: any = null;
  trendData: TrendPoint[] = [];
  currentFilters: DashboardFilters = { module: 'SB' };
  drillStage = '';
  drillVisible = false;
  private subs = new Subscription();

  constructor(private svc: DashboardService) {}

  ngOnInit(): void { this.svc.getModules().subscribe(m => { this.modules = m; }); }
  ngOnDestroy(): void { this.subs.unsubscribe(); }

  loadProducts(code: string): void { this.svc.getProducts(code).subscribe(p => this.products = p); }

  onFilterChange(f: FilterChange): void {
    this.currentFilters = { module: f.module, productId: f.productId, dateFrom: f.dateFrom || undefined, dateTo: f.dateTo || undefined };
    this.loadData();
  }

  refresh(): void { this.loadData(); }

  private loadData(): void {
    this.svc.getStageCounts(this.currentFilters).subscribe(c => this.stageCounts = c);
    this.svc.getTrend(this.currentFilters).subscribe(t => this.trendData = t);
  }

  openDrill(stage: string): void { this.drillStage = stage; this.drillVisible = true; }
}

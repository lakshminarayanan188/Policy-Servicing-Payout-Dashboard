import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MockDashboardService, DashboardFilters } from '../../core/mock/mock-dashboard.service';
import { Module, Product, StageCounts, DrillRecord, PagedResult, TrendPoint } from '../../core/mock/mock-data';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private mock: MockDashboardService) {}

  getModules(): Observable<Module[]>                                                              { return this.mock.getModules(); }
  getProducts(code: string): Observable<Product[]>                                               { return this.mock.getProducts(code); }
  getStageCounts(f: DashboardFilters): Observable<StageCounts>                                   { return this.mock.getStageCounts(f); }
  getStageDrill(stage: string, f: DashboardFilters, page: number, size: number): Observable<PagedResult<DrillRecord>> { return this.mock.getStageDrill(stage, f, page, size); }
  getTrend(f: DashboardFilters): Observable<TrendPoint[]>                                        { return this.mock.getTrend(f); }
}

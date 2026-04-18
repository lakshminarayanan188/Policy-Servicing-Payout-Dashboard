import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MODULES, PRODUCTS, Module, Product, StageCounts, DrillRecord, PagedResult, TrendPoint, getStageCounts, getDrillRecords, getTrend } from './mock-data';

export interface DashboardFilters { module: string; productId?: string; dateFrom?: Date; dateTo?: Date; }

@Injectable({ providedIn: 'root' })
export class MockDashboardService {
  getModules(): Observable<Module[]> {
    return of(MODULES).pipe(delay(200));
  }

  getProducts(moduleCode: string): Observable<Product[]> {
    return of(PRODUCTS.filter(p => p.moduleCode === moduleCode)).pipe(delay(150));
  }

  getStageCounts(filters: DashboardFilters): Observable<StageCounts> {
    return of(getStageCounts(filters.module || 'SB')).pipe(delay(400));
  }

  getStageDrill(stage: string, filters: DashboardFilters, page: number, size: number): Observable<PagedResult<DrillRecord>> {
    return of(getDrillRecords(stage, filters.module || 'SB', page, size)).pipe(delay(300));
  }

  getTrend(filters: DashboardFilters): Observable<TrendPoint[]> {
    return of(getTrend(filters.module || 'SB')).pipe(delay(350));
  }
}

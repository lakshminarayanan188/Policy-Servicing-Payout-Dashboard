import { Component, Output, EventEmitter } from '@angular/core';

export interface SchedulerFilter { search: string; status: string; module: string; }

const STATUSES = [{ label: 'All Statuses', value: '' }, { label: 'Idle', value: 'IDLE' }, { label: 'Running', value: 'RUNNING' }, { label: 'Failed', value: 'FAILED' }, { label: 'Disabled', value: 'DISABLED' }];
const MODULES  = [{ label: 'All Modules', value: '' }, { label: 'SB', value: 'SB' }, { label: 'Maturity', value: 'MAT' }, { label: 'Annuity', value: 'ANN' }, { label: 'Surrender', value: 'SUR' }, { label: 'Death Claim', value: 'DCL' }];

@Component({
  selector: 'app-scheduler-filters',
  template: `
    <div class="sch-filters">
      <span class="p-input-icon-left">
        <i class="pi pi-search"></i>
        <input pInputText [(ngModel)]="filter.search" placeholder="Search schedulers..." (ngModelChange)="emit()" style="width:220px" />
      </span>
      <p-dropdown [options]="statuses" [(ngModel)]="filter.status" optionLabel="label" optionValue="value" (onChange)="emit()" styleClass="filter-sel"></p-dropdown>
      <p-dropdown [options]="modules" [(ngModel)]="filter.module" optionLabel="label" optionValue="value" (onChange)="emit()" styleClass="filter-sel"></p-dropdown>
    </div>
  `,
  styles: [`.sch-filters{display:flex;gap:12px;align-items:center;flex-wrap:wrap;} :host ::ng-deep .filter-sel{min-width:140px;}`]
})
export class SchedulerFiltersComponent {
  @Output() filterChange = new EventEmitter<SchedulerFilter>();
  filter: SchedulerFilter = { search: '', status: '', module: '' };
  statuses = STATUSES;
  modules = MODULES;
  emit(): void { this.filterChange.emit({ ...this.filter }); }
}

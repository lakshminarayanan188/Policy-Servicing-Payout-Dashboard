import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Module, Product } from '../../../core/mock/mock-data';

export interface FilterChange { module: string; productId: string; dateFrom: Date | null; dateTo: Date | null; }

@Component({
  selector: 'app-filter-bar',
  template: `
    <div class="filter-bar">
      <p-dropdown [options]="modules" [(ngModel)]="selectedModule" optionLabel="name" optionValue="code"
        placeholder="Select Module" (onChange)="onModuleChange()" styleClass="filter-select"></p-dropdown>

      <p-dropdown [options]="products" [(ngModel)]="selectedProduct" optionLabel="name" optionValue="id"
        placeholder="All Products" [disabled]="!selectedModule" (onChange)="emit()" styleClass="filter-select"></p-dropdown>

      <p-calendar [(ngModel)]="dateRange" selectionMode="range" [readonlyInput]="true"
        placeholder="Date range" (onSelect)="emit()" styleClass="filter-select" dateFormat="dd/mm/yy"></p-calendar>

      <button pButton label="Clear" icon="pi pi-times" class="p-button-secondary p-button-sm" (click)="clear()"></button>
    </div>
  `,
  styles: [`
    .filter-bar { display:flex; gap:12px; align-items:center; flex-wrap:wrap; }
    :host ::ng-deep .filter-select .p-dropdown, :host ::ng-deep .filter-select { min-width:160px; }
  `]
})
export class FilterBarComponent implements OnInit {
  @Input() modules: Module[] = [];
  @Input() products: Product[] = [];
  @Output() filterChange = new EventEmitter<FilterChange>();
  @Output() moduleSelected = new EventEmitter<string>();

  selectedModule = '';
  selectedProduct = '';
  dateRange: Date[] = [];

  ngOnInit(): void { if (this.modules.length) { this.selectedModule = this.modules[0].code; this.onModuleChange(); } }

  onModuleChange(): void { this.selectedProduct = ''; this.moduleSelected.emit(this.selectedModule); this.emit(); }

  emit(): void {
    this.filterChange.emit({
      module: this.selectedModule,
      productId: this.selectedProduct,
      dateFrom: (this.dateRange && this.dateRange[0]) ? this.dateRange[0] : null,
      dateTo: (this.dateRange && this.dateRange[1]) ? this.dateRange[1] : null
    });
  }

  clear(): void { this.selectedProduct = ''; this.dateRange = []; this.emit(); }
}

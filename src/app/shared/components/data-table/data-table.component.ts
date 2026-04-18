import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as XLSX from 'xlsx';

export interface ColDef { field: string; header: string; sortable?: boolean; pipe?: string; }
export interface PageChange { page: number; size: number; }

@Component({
  selector: 'app-data-table',
  template: `
    <div class="table-wrap">
      <div class="table-toolbar" *ngIf="showExport">
        <button pButton label="Export Excel" icon="pi pi-file-excel" class="p-button-success p-button-sm" (click)="exportExcel()"></button>
      </div>
      <p-table [value]="rows" [columns]="columns" [lazy]="true" [totalRecords]="totalRecords"
        [paginator]="true" [rows]="pageSize" [loading]="loading"
        (onLazyLoad)="onLazy($event)" [rowsPerPageOptions]="[10,25,50]"
        styleClass="p-datatable-sm p-datatable-striped p-datatable-gridlines">
        <ng-template pTemplate="header" let-cols>
          <tr>
            <th *ngFor="let col of cols" [pSortableColumn]="col.sortable ? col.field : null">
              {{ col.header }}
              <p-sortIcon *ngIf="col.sortable" [field]="col.field"></p-sortIcon>
            </th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-row let-cols="columns">
          <tr>
            <td *ngFor="let col of cols">{{ row[col.field] }}</td>
          </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
          <tr><td [attr.colspan]="columns.length" class="text-center p-4">No records found</td></tr>
        </ng-template>
      </p-table>
    </div>
  `,
  styles: [`.table-toolbar { display:flex; justify-content:flex-end; margin-bottom:8px; } .table-wrap { overflow:auto; }`]
})
export class DataTableComponent {
  @Input() columns: ColDef[] = [];
  @Input() rows: any[] = [];
  @Input() totalRecords = 0;
  @Input() loading = false;
  @Input() pageSize = 10;
  @Input() showExport = true;
  @Input() exportFilename = 'export';
  @Output() pageChange = new EventEmitter<PageChange>();

  onLazy(event: any): void {
    const page = Math.floor((event.first || 0) / (event.rows || 10));
    this.pageChange.emit({ page, size: event.rows || 10 });
  }

  exportExcel(): void {
    const ws = XLSX.utils.json_to_sheet(this.rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, `${this.exportFilename}.xlsx`);
  }
}

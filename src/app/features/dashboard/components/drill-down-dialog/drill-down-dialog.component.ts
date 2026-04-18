import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { DashboardFilters } from '../../../../core/mock/mock-dashboard.service';
import { DrillRecord } from '../../../../core/mock/mock-data';
import { ColDef } from '../../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-drill-down-dialog',
  template: `
    <p-dialog [(visible)]="visible" [header]="'Stage: ' + stage" [modal]="true" [maximizable]="true"
      [style]="{width:'90vw', maxWidth:'1200px'}" (onHide)="visibleChange.emit(false)">
      <app-data-table
        [columns]="columns"
        [rows]="rows"
        [totalRecords]="total"
        [loading]="loading"
        [exportFilename]="'stage-' + stage"
        (pageChange)="load($event.page, $event.size)">
      </app-data-table>
    </p-dialog>
  `
})
export class DrillDownDialogComponent implements OnInit {
  @Input() visible = false;
  @Input() stage = '';
  @Input() filters: DashboardFilters = { module: 'SB' };
  @Output() visibleChange = new EventEmitter<boolean>();

  rows: DrillRecord[] = [];
  total = 0;
  loading = false;

  columns: ColDef[] = [
    { field: 'policyNo',     header: 'Policy No',      sortable: true  },
    { field: 'insuredName',  header: 'Insured Name',   sortable: true  },
    { field: 'product',      header: 'Product',        sortable: true  },
    { field: 'amount',       header: 'Amount (₹)',     sortable: true  },
    { field: 'enteredAt',    header: 'Entered At',     sortable: true  },
    { field: 'agingDays',    header: 'Aging (Days)',   sortable: true  },
    { field: 'status',       header: 'Status'                          }
  ];

  constructor(private svc: DashboardService) {}

  ngOnInit(): void { this.load(0, 10); }

  load(page: number, size: number): void {
    this.loading = true;
    this.svc.getStageDrill(this.stage, this.filters, page, size).subscribe(res => {
      this.rows = res.data;
      this.total = res.total;
      this.loading = false;
    });
  }
}

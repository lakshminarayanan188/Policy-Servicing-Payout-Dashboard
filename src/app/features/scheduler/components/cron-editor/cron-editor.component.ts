import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-cron-editor',
  template: `
    <div class="cron-editor">
      <span class="cron-display" *ngIf="!editing" (click)="editing = true" title="Click to edit">{{ cron }}</span>
      <div class="cron-input-row" *ngIf="editing">
        <input pInputText [(ngModel)]="draft" style="width:200px;font-family:monospace;font-size:13px" />
        <button pButton icon="pi pi-check" class="p-button-success p-button-sm" (click)="save()"></button>
        <button pButton icon="pi pi-times" class="p-button-secondary p-button-sm" (click)="cancel()"></button>
      </div>
      <div class="cron-human">{{ (editing ? draft : cron) | cronHuman }}</div>
    </div>
  `,
  styles: [`
    .cron-editor { display:flex; flex-direction:column; gap:4px; }
    .cron-display { font-family:monospace; font-size:13px; color:#3B82F6; cursor:pointer; text-decoration:underline dotted; }
    .cron-input-row { display:flex; gap:4px; align-items:center; }
    .cron-human { font-size:11px; color:#64748B; }
  `]
})
export class CronEditorComponent implements OnChanges {
  @Input() cron = '';
  @Output() cronChange = new EventEmitter<string>();
  editing = false;
  draft = '';

  save(): void { this.cron = this.draft; this.cronChange.emit(this.cron); this.editing = false; }
  cancel(): void { this.editing = false; }

  ngOnChanges(): void { this.draft = this.cron; }
}

import { Component } from '@angular/core';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-shell',
  template: `
    <p-toast></p-toast>
    <div class="shell">
      <app-sidebar [collapsed]="sidebarCollapsed" (toggleCollapse)="sidebarCollapsed = !sidebarCollapsed"></app-sidebar>
      <div class="main-area">
        <app-header></app-header>
        <p-progressBar *ngIf="loading.isLoading" mode="indeterminate" [style]="{'height':'3px'}"></p-progressBar>
        <main class="page-content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .shell { display:flex; min-height:100vh; }
    .main-area { flex:1; display:flex; flex-direction:column; background:#F8FAFC; overflow:hidden; }
    .page-content { flex:1; padding:24px; overflow:auto; }
  `]
})
export class ShellComponent {
  sidebarCollapsed = false;
  constructor(public loading: LoadingService) {}
}

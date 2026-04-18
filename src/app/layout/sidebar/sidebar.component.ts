import { Component, Input, Output, EventEmitter } from '@angular/core';

interface NavItem { label: string; icon: string; route: string; }

@Component({
  selector: 'app-sidebar',
  template: `
    <nav class="sidebar" [class.collapsed]="collapsed">
      <div class="sidebar-logo">
        <span class="logo-icon">PS</span>
        <span class="logo-text" *ngIf="!collapsed">PolicyServ</span>
      </div>
      <ul class="nav-list">
        <li *ngFor="let item of navItems">
          <a [routerLink]="item.route" routerLinkActive="active" class="nav-item" [title]="item.label">
            <i [class]="'pi ' + item.icon"></i>
            <span *ngIf="!collapsed">{{ item.label }}</span>
          </a>
        </li>
      </ul>
      <button class="collapse-btn" (click)="toggleCollapse.emit()">
        <i class="pi" [class]="collapsed ? 'pi-chevron-right' : 'pi-chevron-left'"></i>
      </button>
    </nav>
  `,
  styles: [`
    .sidebar { background:#1A2B4C; color:#fff; display:flex; flex-direction:column; width:220px; min-height:100vh; transition:width 0.25s ease; position:relative; }
    .sidebar.collapsed { width:64px; }
    .sidebar-logo { display:flex; align-items:center; gap:10px; padding:20px 16px; border-bottom:1px solid rgba(255,255,255,.1); }
    .logo-icon { background:#0EA5A0; color:#fff; font-weight:700; font-size:14px; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:6px; flex-shrink:0; }
    .logo-text { font-weight:700; font-size:15px; white-space:nowrap; }
    .nav-list { list-style:none; padding:16px 0; margin:0; flex:1; }
    .nav-item { display:flex; align-items:center; gap:12px; padding:12px 16px; color:rgba(255,255,255,.7); text-decoration:none; border-radius:0 24px 24px 0; margin-right:8px; transition:background .2s,color .2s; font-size:14px; white-space:nowrap; }
    .nav-item:hover { background:rgba(255,255,255,.1); color:#fff; }
    .nav-item.active { background:#0EA5A0; color:#fff; }
    .nav-item i { font-size:16px; flex-shrink:0; }
    .collapse-btn { background:none; border:none; color:rgba(255,255,255,.5); cursor:pointer; padding:12px; width:100%; text-align:center; border-top:1px solid rgba(255,255,255,.1); transition:color .2s; }
    .collapse-btn:hover { color:#fff; }
  `]
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Output() toggleCollapse = new EventEmitter<void>();

  navItems: NavItem[] = [
    { label: 'Dashboard',   icon: 'pi-chart-bar',   route: '/dashboard'   },
    { label: 'Schedulers',  icon: 'pi-calendar',    route: '/schedulers'  }
  ];
}

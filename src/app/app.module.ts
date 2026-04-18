import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { ProgressBarModule } from 'primeng/progressbar';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService, ConfirmationService } from 'primeng/api';

// App
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Interceptors
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';

// Layout
import { ShellComponent } from './layout/shell/shell.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';

// Shared
import { BadgeComponent } from './shared/components/badge/badge.component';
import { CountdownTimerComponent } from './shared/components/countdown-timer/countdown-timer.component';
import { DataTableComponent } from './shared/components/data-table/data-table.component';
import { FilterBarComponent } from './shared/components/filter-bar/filter-bar.component';
import { StageCardComponent } from './shared/components/stage-card/stage-card.component';
import { RelativeTimePipe } from './shared/pipes/relative-time.pipe';
import { CronHumanPipe } from './shared/pipes/cron-human.pipe';

// Features
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { SummaryBarComponent } from './features/dashboard/components/summary-bar/summary-bar.component';
import { StageGridComponent } from './features/dashboard/components/stage-grid/stage-grid.component';
import { TrendChartComponent } from './features/dashboard/components/trend-chart/trend-chart.component';
import { DrillDownDialogComponent } from './features/dashboard/components/drill-down-dialog/drill-down-dialog.component';
import { SchedulerComponent } from './features/scheduler/scheduler.component';
import { SchedulerTableComponent } from './features/scheduler/components/scheduler-table/scheduler-table.component';
import { SchedulerFiltersComponent } from './features/scheduler/components/scheduler-filters/scheduler-filters.component';
import { RunHistoryDrawerComponent } from './features/scheduler/components/run-history-drawer/run-history-drawer.component';
import { CronEditorComponent } from './features/scheduler/components/cron-editor/cron-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    // Layout
    ShellComponent,
    SidebarComponent,
    HeaderComponent,
    // Shared
    BadgeComponent,
    CountdownTimerComponent,
    DataTableComponent,
    FilterBarComponent,
    StageCardComponent,
    RelativeTimePipe,
    CronHumanPipe,
    // Auth
    LoginComponent,
    // Dashboard
    DashboardComponent,
    SummaryBarComponent,
    StageGridComponent,
    TrendChartComponent,
    DrillDownDialogComponent,
    // Scheduler
    SchedulerComponent,
    SchedulerTableComponent,
    SchedulerFiltersComponent,
    RunHistoryDrawerComponent,
    CronEditorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    // PrimeNG
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    ToastModule,
    DialogModule,
    SidebarModule,
    ProgressBarModule,
    ChartModule,
    CheckboxModule,
    PasswordModule,
    MessageModule,
    MessagesModule,
    TooltipModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

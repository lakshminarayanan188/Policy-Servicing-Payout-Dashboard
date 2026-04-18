import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { SCHEDULERS, RunHistory, Scheduler, getRunHistory } from './mock-data';

@Injectable({ providedIn: 'root' })
export class MockSchedulerService {
  private schedulers = [...SCHEDULERS];

  getSchedulers(): Observable<Scheduler[]> {
    return of(this.schedulers).pipe(delay(300));
  }

  getHistory(id: string, limit = 10): Observable<RunHistory[]> {
    return of(getRunHistory(id).slice(0, limit)).pipe(delay(250));
  }

  trigger(id: string): Observable<void> {
    const s = this.schedulers.find(x => x.id === id);
    if (s) { s.status = 'RUNNING'; s.lastRunStatus = 'RUNNING'; s.lastRunTime = new Date(); }
    return of(undefined).pipe(delay(500));
  }

  toggle(id: string): Observable<Scheduler> {
    const s = this.schedulers.find(x => x.id === id)!;
    s.enabled = !s.enabled;
    s.status = s.enabled ? 'IDLE' : 'DISABLED';
    return of({ ...s }).pipe(delay(300));
  }

  updateCron(id: string, cron: string): Observable<Scheduler> {
    const s = this.schedulers.find(x => x.id === id)!;
    s.cronExpression = cron;
    return of({ ...s }).pipe(delay(300));
  }
}

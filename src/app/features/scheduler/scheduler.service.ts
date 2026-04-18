import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MockSchedulerService } from '../../core/mock/mock-scheduler.service';
import { Scheduler, RunHistory } from '../../core/mock/mock-data';

@Injectable({ providedIn: 'root' })
export class SchedulerService {
  constructor(private mock: MockSchedulerService) {}

  getSchedulers(): Observable<Scheduler[]>              { return this.mock.getSchedulers(); }
  getHistory(id: string, limit = 10): Observable<RunHistory[]> { return this.mock.getHistory(id, limit); }
  trigger(id: string): Observable<void>                 { return this.mock.trigger(id); }
  toggle(id: string): Observable<Scheduler>             { return this.mock.toggle(id); }
  updateCron(id: string, cron: string): Observable<Scheduler> { return this.mock.updateCron(id, cron); }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cronHuman' })
export class CronHumanPipe implements PipeTransform {
  transform(cron: string | null): string {
    if (!cron) return '—';
    const parts = cron.trim().split(/\s+/);
    if (parts.length < 5) return cron;
    const [sec, min, hour, dom, month, dow] = parts;

    if (min === '0/30' || min === '*/30') return 'Every 30 minutes';
    if (min === '0/20' || min === '*/20') return 'Every 20 minutes';
    if (min === '0/15' || min === '*/15') return 'Every 15 minutes';
    if (min.startsWith('0/')) return `Every ${min.split('/')[1]} minutes`;
    if (dom === '*' && hour === '*' && min === '15') return 'Every hour at :15';
    if (dom === '*' && hour === '*' && min === '0') return 'Every hour';

    const days: { [key: string]: string } = { MON: 'Monday', TUE: 'Tuesday', WED: 'Wednesday', THU: 'Thursday', FRI: 'Friday', SAT: 'Saturday', SUN: 'Sunday' };
    const dayLabel = dow && dow !== '?' && dow !== '*' ? ` on ${days[dow] || dow}` : '';

    if (hour.includes(',')) {
      return `Daily at ${hour.split(',').map(h => `${h.padStart(2, '0')}:${(min || '00').padStart(2, '0')}`).join(' and ')}`;
    }

    const h = hour.padStart(2, '0');
    const m = (min || '0').padStart(2, '0');
    return `Daily at ${h}:${m}${dayLabel}`;
  }
}

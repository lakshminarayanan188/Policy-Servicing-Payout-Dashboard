import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  template: `<span class="countdown">Auto-refresh in {{ remaining }}s</span>`,
  styles: [`.countdown { font-size: 12px; color: #64748B; }`]
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
  @Input() seconds = 30;
  @Output() tick = new EventEmitter<void>();
  remaining = 0;
  private timer: any;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void { this.remaining = this.seconds; this.start(); }
  ngOnDestroy(): void { clearInterval(this.timer); }

  private start(): void {
    this.timer = setInterval(() => {
      this.remaining--;
      if (this.remaining <= 0) { this.remaining = this.seconds; this.tick.emit(); }
      this.cd.markForCheck();
    }, 1000);
  }
}

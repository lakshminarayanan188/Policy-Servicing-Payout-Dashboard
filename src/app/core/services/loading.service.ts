import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private count = 0;
  isLoading = false;

  increment(): void { this.count++; this.isLoading = this.count > 0; }
  decrement(): void { this.count = Math.max(0, this.count - 1); this.isLoading = this.count > 0; }
}

import { Injectable, signal } from '@angular/core';
import { ToastTypeEnum } from '../enums';

@Injectable({ providedIn: 'root' })
export class ToastService {
  $message = signal('');
  $type = signal<ToastTypeEnum>('success');
  $isVisible = signal(false);
  $icon = signal('info');

  show(message: string, type: ToastTypeEnum = 'success') {
    this.$message.set(message);
    this.$type.set(type);
    this.$icon.set(this.resolveIcon(type));
    this.$isVisible.set(true);

    setTimeout(() => this.$isVisible.set(false), 3000);
  }

  private resolveIcon(type: ToastTypeEnum): string {
    switch (type) {
      case 'success': return 'check';
      case 'error': return 'close';
      case 'warning': return 'alert-triangle';
      default: return 'info';
    }
  }
}

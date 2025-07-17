import {
  booleanAttribute,
  Component,
  EventEmitter,
  Input,
  input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AlertType } from './enums/alert.enum';
import { NgClass } from '@angular/common';
import { ButtonComponent } from '../button';
import { IconComponent } from '../../atoms';

@Component({
  selector: 'app-alert',
  imports: [NgClass, IconComponent, ButtonComponent],
  templateUrl: './alert.component.html',
})
export class AlertComponent {
  readonly $type = input<AlertType>(AlertType.INFO, { alias: 'type' });
  @Input() $show: boolean = true;
  @Output() showChange = new EventEmitter<void>();

  close() {
    this.$show = false;
    this.showChange.emit();
  }
}

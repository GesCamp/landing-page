import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChildren,
  EventEmitter,
  Output,
} from '@angular/core';
import { DividerComponent, IconComponent } from '../../atoms';
import { SlotAsRecordPipe, SLOT } from '../../utils';

@Component({
  selector: 'app-modal',
  imports: [
    SlotAsRecordPipe,
    NgTemplateOutlet,
    DividerComponent,
    IconComponent,
  ],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  readonly $slots = contentChildren(SLOT);
  @Output() close = new EventEmitter<void>();

  emitClose() {
    this.close.emit();
  }
}

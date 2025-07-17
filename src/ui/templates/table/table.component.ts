import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChildren } from '@angular/core';
import { SLOT, SlotAsRecordPipe } from '../../utils';
import { DividerComponent } from '../../atoms';

@Component({
  selector: 'app-table',
  imports: [SlotAsRecordPipe, NgTemplateOutlet, DividerComponent],
  templateUrl: './table.component.html',
})
export class TableComponent {
  protected readonly $slots = contentChildren(SLOT);
}

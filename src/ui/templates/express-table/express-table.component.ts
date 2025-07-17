import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  Component,
  contentChildren,
  input,
} from '@angular/core';
import { DividerComponent } from '../../atoms';
import { SlotAsRecordPipe, SLOT } from '../../utils';

@Component({
  selector: 'app-express-table',
  imports: [SlotAsRecordPipe, NgTemplateOutlet, DividerComponent],
  templateUrl: './express-table.component.html',
})
export class ExpressTableComponent {
  protected readonly $slots = contentChildren(SLOT);

  readonly $addBottonLine = input(false, {
    alias: 'addBottomLine',
    transform: booleanAttribute,
  });
}

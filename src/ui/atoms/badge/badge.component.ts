import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { BadgeType } from './enums';


@Component({
  selector: 'app-badge',
  imports: [NgClass],
  templateUrl: './badge.component.html',
})
export class BadgeComponent {
  readonly $text = input<string | null>(null, {alias: 'text'})
  readonly $type = input<BadgeType>(BadgeType.INFO, {alias: 'type'})
}

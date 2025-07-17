import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { ToastService } from './data-access';
import { IconComponent } from '../../atoms';

@Component({
  selector: 'app-toast',
  imports: [NgClass, IconComponent],
  templateUrl: './toast.component.html',
})
export class ToastComponent {
  constructor(public toast: ToastService) {}
}

import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-header-dashboard',
  imports: [CommonModule],
  templateUrl: './header-dashboard.component.html',
})
export class HeaderDashboardComponent {
    readonly $title = input<string>(undefined,{alias: 'title'})

    readonly $subtitle = input<string>(undefined, {alias: 'subtitle'})

    clickedButton(){
      console.log('holas')
    }
}

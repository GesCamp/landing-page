import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IgxCarouselModule, IgxSliderModule } from 'igniteui-angular';
@Component({
  selector: 'app-index-carousel',
  standalone: true,
  imports: [CommonModule, IgxCarouselModule, IgxSliderModule],
  templateUrl: './index-carousel.component.html',
  styleUrl: './index-carousel.component.css',
})
export class IndexCarouselComponent {
  images = [
    { path: 'assets/images/1.jpg' },
    { path: 'assets/images/2.jpg' },
    { path: 'assets/images/3.jpg' },
  ];

  getCaptionTitle(index: number): string {
    const titles = [
      'Incendio de Futa',
      'Ceremonia Bomberos',
      'Bomberos en acción',
    ];
    return titles[index] || '';
  }

  getCaptionDescription(index: number): string {
    const descriptions = [
      'Bomberos de Malalhue, trabajando en Incendio de Forestal.',
      'Bomberos participando en actividades junto a la comunidad',
      'Bomberos participando de capcitaciones en Campus de Entrenamiento',
    ];
    return descriptions[index] || '';
  }
}

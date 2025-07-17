import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IgxCarouselModule, IgxSliderModule } from 'igniteui-angular';
import {
  ImageDetailsDto,
  PrincipalCarouselService,
} from '../../../services/principal-carousel';
import { catchError, firstValueFrom, of, tap } from 'rxjs';
@Component({
    selector: 'app-index-carousel',
    imports: [CommonModule, IgxCarouselModule, IgxSliderModule],
    templateUrl: './index-carousel.component.html',
    styleUrl: './index-carousel.component.css'
})
export class IndexCarouselComponent implements OnInit {
  principalCarousel: any[] = [];
  imagesWithLinks: ImageDetailsDto[] = [];

  currentImageIndex: number = 0;

  constructor(
    private readonly getPrincipalCarousel: PrincipalCarouselService
  ) {}

  ngOnInit() {
    this.loadPrincipalCarousel();
  }

  async loadPrincipalCarousel(): Promise<void> {
    const id = 'principal';

    this.getPrincipalCarousel
      .getPrincipalBanner(id)
      .pipe(
        tap((images) => {
          this.imagesWithLinks = images;
        }),
        catchError((error) => {
          console.error('Error al obtener las imágenes:', error);
          return of([]);
        })
      )
      .subscribe();
  }
}

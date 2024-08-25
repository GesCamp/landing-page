import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IgxCarouselModule, IgxSliderModule } from 'igniteui-angular';
import { PrincipalCarouselService } from '../../../services/principal-carousel';
@Component({
  selector: 'app-index-carousel',
  standalone: true,
  imports: [CommonModule, IgxCarouselModule, IgxSliderModule],
  templateUrl: './index-carousel.component.html',
  styleUrl: './index-carousel.component.css',
})
export class IndexCarouselComponent implements OnInit {
  principalCarousel: any[] = [];
  imagesWithLinks: { src: string; id: number; link: string; alt: string }[] =
    [];
  currentImageIndex: number = 0;

  constructor(
    private readonly getPrincipalCarousel: PrincipalCarouselService
  ) {}

  ngOnInit() {
    this.loadPrincipalCarousel();
  }

  async loadPrincipalCarousel(): Promise<void> {
    const id = 'principal';
    (await this.getPrincipalCarousel.getPrincipalBanner(id)).subscribe(
      (data) => {
        this.extractImagesAndLinks(data);
      },
      (error) => {
        console.error('Ocurrió un error al obtener los datos:', error);
      }
    );
  }
  extractImagesAndLinks(data: any): void {
    this.imagesWithLinks = [];

    data.forEach((item1: any) => {
      if (item1.content && item1.content.rendered) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(item1.content.rendered, 'text/html');

        doc.querySelectorAll('a').forEach((a: HTMLAnchorElement) => {
          const href = a.getAttribute('href');
          a.querySelectorAll('img').forEach((img: HTMLImageElement) => {
            const src = img.getAttribute('src');
            const alt = img.getAttribute('alt') || 'Imagen sin descripción';
            if (src && href) {
              this.imagesWithLinks.push({
                src,
                link: href,
                alt,
                id: 0,
              });
            }
          });
        });
      }
    });
  }
}

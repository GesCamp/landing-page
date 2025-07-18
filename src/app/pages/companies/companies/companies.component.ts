import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-companies',
    templateUrl: './companies.component.html',
    styleUrls: ['./companies.component.css'],
    imports: [RouterLink]
})
export class CompaniesComponent {
  parallax() {
    const scrollPosition = window.scrollY;
    const parallaxOffset = scrollPosition * 0.2;
    const images = document.getElementsByClassName(
      'parallax-img'
    ) as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      image.style.transform = `translate3d(0, ${parallaxOffset}px, 0)`;
    }
  }
}

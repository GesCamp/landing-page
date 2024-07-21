import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
  imports: [RouterModule],
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

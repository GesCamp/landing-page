import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FloatInputComponent } from '../../shared/components/float-input/float-input.component';
import { IndexCarouselComponent } from '../../shared/components/index-carousel/index-carousel.component';
import { GetAllPostsService } from '../../services/post';
import { LoadingComponent } from './components/loading/loading.component';
import { GetGalleriesComponent } from './components/galleries/get-galleries/get-galleries.component';
import { ContactFormComponent } from './components/forms/contact-form/contact-form.component';
import { PostulationFormComponent } from './components/forms/postulation-form/postulation-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FloatInputComponent,
    IndexCarouselComponent,
    LoadingComponent,
    GetGalleriesComponent,
    ContactFormComponent,
    PostulationFormComponent,
  ],
  providers: [DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  isLoading: boolean = true;
  // images = [
  //   { path: 'assets/images/1.jpg' },
  //   { path: 'assets/images/2.jpg' },
  //   { path: 'assets/images/3.jpg' },
  // ];
  contactForm!: FormGroup;
  currentPage: number = 1;
  perPage: number = 9;

  constructor(
    private datePipe: DatePipe,
    private readonly getPostsService: GetAllPostsService,
    private route: ActivatedRoute // Inyecta ActivatedRoute
  ) {}

  posts: any[] = [];
  ngOnInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' }); // Desplazamiento suave
        }
      }
    });

    this.isLoading = true; // Asegúrate de que esté en true al comenzar

    this.getPostsService.getPosts(this.currentPage, this.perPage).subscribe(
      ({ posts }) => {
        this.posts = posts;
        this.isLoading = false; // Cambia a false cuando los datos estén listos
      },
      (error) => {
        console.error('Error fetching posts:', error);
        this.isLoading = false; // Cambia a false en caso de error también
      }
    );
  }

  getFeaturedImage(post: any): string {
    return post._embedded &&
      post._embedded['wp:featuredmedia'] &&
      post._embedded['wp:featuredmedia'][0]
      ? post._embedded['wp:featuredmedia'][0].source_url
      : '';
  }

  getCategories(post: any): string[] {
    return post._embedded &&
      post._embedded['wp:term'] &&
      post._embedded['wp:term'][0]
      ? post._embedded['wp:term'][0].map((term: any) => term.name)
      : [];
  }

  formatData(date: string): string {
    const formattedDate = this.datePipe.transform(date, 'dd/MM/yyyy');
    return formattedDate ? formattedDate : 'Fecha';
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Formulario enviado:', this.contactForm.value);
    } else {
      console.log('El formulario no es válido');
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.parallax();
  }

  parallax() {
    const scrollPosition = window.scrollY;
    const parallaxOffset = scrollPosition * 0.2; // Puedes ajustar este valor para cambiar la velocidad del efecto parallax
    const images = document.getElementsByClassName(
      'parallax-img'
    ) as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      image.style.transform = `translate3d(0, ${parallaxOffset}px, 0)`;
    }
  }
  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }
}

import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GalleriesService } from '../../../services';
import { GetGalleryBySlugDto } from '../../../services/features/gallery/dtos';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LinksHomeComponent } from '../../../shared/components/links-home/links-home.component';
import { LoadingComponent } from '../../home/components/loading/loading.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageModalComponent } from './feature/image-modal';

@Component({
  selector: 'app-get-gallery',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LinksHomeComponent,
    LoadingComponent,
    ImageModalComponent,
  ],
  templateUrl: './get-gallery.component.html',
  styleUrls: ['./get-gallery.component.css'],
})
export class GetGalleryComponent implements OnInit, OnDestroy {
  gallery$: Observable<GetGalleryBySlugDto> | undefined;
  gallery: GetGalleryBySlugDto | null = null;
  currentPage: number = 1;
  perPage: number = 30;
  totalPages: number = 1;
  isLoading: boolean = true;
  slug!: string;
  modalImage: string = '';
  private destroy$ = new Subject<void>();
  private modalService = inject(NgbModal);

  private subscription: Subscription = new Subscription();

  constructor(
    private readonly galleryService: GalleriesService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.slug = params['slug-galery'];
      this.loadGallery();
    });
  }

  loadGallery(): void {
    this.isLoading = true;
    this.gallery$ = this.galleryService.getGalleryBySlug(
      this.slug,
      this.currentPage,
      this.perPage
    );
    this.subscription.add(
      this.gallery$.subscribe({
        next: (gallery) => {
          this.gallery = gallery;
          this.totalPages = gallery.total_pages;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error al cargar la galería', err);
          this.isLoading = false;
        },
      })
    );
  }

  openModal(imageUrl: string, imageTitle: string): void {
    const modalRef = this.modalService.open(ImageModalComponent, {
      backdrop: true,
      keyboard: true,
      centered: true,
      animation: true,
      size: 'xl',
    });
    modalRef.componentInstance.imageUrl = imageUrl;
    modalRef.componentInstance.imageTitle = imageTitle;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadGallery();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadGallery();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.modalService.dismissAll();
    this.subscription.unsubscribe();
  }
}

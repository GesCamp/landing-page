import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { GetAllPostsService } from '../../../../services/post';
import { DatePipe, CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { RouterModule } from '@angular/router';
import { LinksHomeComponent } from '../../../../shared/components/links-home/links-home.component';

@Component({
  standalone: true,
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  providers: [DatePipe],
  imports: [CommonModule, LoadingComponent, RouterModule, LinksHomeComponent],
})
export class PostsComponent implements OnInit, OnDestroy {
  posts$: Observable<{ posts: any[]; totalPages: number }> | undefined;
  posts: any[] = [];
  currentPage: number = 1;
  perPage: number = 9;
  totalPages: number = 1;
  isLoading: boolean = true;
  private subscription: Subscription = new Subscription();

  constructor(
    private postsService: GetAllPostsService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.posts$ = this.postsService.getPosts(this.currentPage, this.perPage);
    this.subscription.add(
      this.posts$.subscribe({
        next: ({ posts, totalPages }) => {
          this.posts = posts;
          this.totalPages = totalPages;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading posts:', err);
          this.isLoading = false;
        },
      })
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

  formatDate(date: string): string {
    const formattedDate = this.datePipe.transform(date, 'dd/MM/yyyy');
    return formattedDate ? formattedDate : 'Fecha no disponible';
  }

  truncateText(text: string, limit: number): string {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPosts();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPosts();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WordpressService } from '../../../../services/api.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LinksHomeComponent } from '../../../../shared/components/links-home/links-home.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, RouterModule, LinksHomeComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  posts$: Observable<any[]> | undefined;
  constructor(
    private postsService: WordpressService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.posts$ = this.postsService.getPosts();
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
}

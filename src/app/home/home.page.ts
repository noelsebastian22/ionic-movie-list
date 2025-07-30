import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  InfiniteScrollCustomEvent,
  IonList,
  IonItem,
  IonAvatar,
  IonSkeletonText,
  IonAlert,
  IonLabel,
  IonBadge,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { catchError, finalize } from 'rxjs';
import { MovieResult } from '../models/movie';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  imports: [
    IonInfiniteScrollContent,
    IonInfiniteScroll,
    IonLabel,
    IonAlert,
    IonSkeletonText,
    IonAvatar,
    IonItem,
    IonList,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    CommonModule,
    RouterModule,
    IonBadge,
  ],
})
export class HomePage {
  private readonly movieService = inject(MovieService);
  private currentPage = 1;
  public error: string | null = null;
  public isLoading = false;
  public movies: MovieResult[] = [];
  public imageBaseUrl = this.movieService.imageBaseUrl;

  dummyArray = Array(5)
    .fill(0)
    .map((_, i) => i + 1);

  constructor() {
    this.loadMovies();
  }

  loadMovies(event?: InfiniteScrollCustomEvent) {
    this.error = null;

    if (!event) this.isLoading = true;

    this.movieService
      .getTopRatedMovies(this.currentPage)
      .pipe(
        finalize(() => {
          if (event) {
            event.target.complete();
          }
          this.isLoading = false;
        }),
        catchError((err) => {
          this.error = err.error.status_message || 'Failed to load movies';
          console.error('Error loading movies:', err);
          return []; // Return an empty array on error
        })
      )
      .subscribe((movies) => {
        console.log('Movies loaded:', movies);
        this.movies.push(...movies.results);
        // this.movies = [];
        this.currentPage = movies.page;

        if (event) {
          event.target.disabled = movies.page >= movies.total_pages;
        }
      });
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    ++this.currentPage;
    this.loadMovies(event);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResult, MovieDetails, MovieResult } from '../models/movie';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly http = inject(HttpClient);
  public readonly imageBaseUrl = 'https://image.tmdb.org/t/p';

  constructor() {}

  getTopRatedMovies(page: number = 1): Observable<ApiResult> {
    return this.http.get<ApiResult>(
      `${BASE_URL}/movie/popular?language=en-US&page=${page}&api_key=${API_KEY}`
    );
  }

  getMovieDetails(id: number): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
    );
  }
}

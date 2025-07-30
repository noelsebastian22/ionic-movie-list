import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly http = inject(HttpClient);

  constructor() {}

  getTopRatedMovies(page: number = 1) {
    return this.http.get(
      `${BASE_URL}/movies/popular?page=${page}&api_key=${API_KEY}`
    );
  }

  getMovieDetails(id: number) {
    return this.http.get(`${BASE_URL}/movies/${id}?api_key=${API_KEY}`);
  }
}

import {
  Component,
  inject,
  Input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonText,
  IonBadge,
  IonLabel,
  IonItem,
} from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { MovieDetails } from '../models/movie';
import { addIcons } from 'ionicons';
import { cashOutline, calendarOutline } from 'ionicons/icons';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonLabel,
    IonBadge,
    IonText,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class DetailsPage {
  private readonly movieService = inject(MovieService);
  public imageBaseUrl = this.movieService.imageBaseUrl;
  public movie: WritableSignal<MovieDetails | null> = signal(null);

  @Input()
  set id(movieId: number) {
    if (movieId) {
      this.movieService.getMovieDetails(movieId).subscribe((movie) => {
        console.log('Movie details:', movie);
        this.movie.set(movie);
      });
    }
  }

  constructor() {
    addIcons({ cashOutline, calendarOutline });
  }
}

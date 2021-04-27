import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  public favoriteLocations: object = {};

  constructor() {
  }

  getFavoritsList(): Observable<any> | any {
    return of(this.favoriteLocations);
  }

  addToFavorites(location: any, forecast: any): Observable<any> | any {
    if (!this.inFavorite[location.Key]) {
      this.favoriteLocations[location.Key] = {
        location: location,
        forecast: forecast
      };
    }
    return of(true);
  }

  removeFromFavorites(locationKey: string): Observable<any> | any {
    delete this.favoriteLocations[locationKey];
    return of(false);
  }

  inFavorite(locationKey: string): Observable<any> | any {
    return of( !!this.favoriteLocations[locationKey]);
  }

}

import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForecastsService {

  private apiKey = '6wbCkb3xafZ7Gn0WFZ4yvysXLSHAeoeQ';

  constructor(private http: HttpClient) {
  }

  get1DayOfForecasts(locationKey:string) {
    const reqParams = new HttpParams()
      .set('apikey', this.apiKey)
      .set('details', 'true')
      .set('metric', 'true');
    return this.http.get<any>(`forecasts/v1/daily/1day/` + locationKey, {params: reqParams})
      .pipe(
        map(resp => resp.DailyForecasts[0])
      );
  }

  getDaysOfForecasts(locationKey:string) {
    const reqParams = new HttpParams()
      .set('apikey', this.apiKey)
      .set('details', 'true')
      .set('metric', 'true');
    return this.http.get<any>(`forecasts/v1/daily/5day/` + locationKey, {params: reqParams})
      .pipe(
        map(resp => resp.DailyForecasts)
      );
  }

}

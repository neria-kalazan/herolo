import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiKey = '6wbCkb3xafZ7Gn0WFZ4yvysXLSHAeoeQ';

  constructor(private http: HttpClient) {
  }

  getIp() {
    return this.http.get<any>(`https://api.ipify.org?format=json`)
      .pipe(
        map(resp => resp.ip)
      );
  }

  getLocationByIp(ip) {
    const reqParams = new HttpParams()
      .set('apikey', this.apiKey)
      .set('q', ip);
    return this.http.get<any>(`locations/v1/cities/ipaddress`, {params: reqParams});
  }

  getLocationList(query) {
    const reqParams = new HttpParams()
      .set('apikey', this.apiKey)
      .set('q', query);
    return this.http.get<any>(`locations/v1/cities/autocomplete`, {params: reqParams});
  }

}

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import { LocationService } from '../services/location.service';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class LocationResolver implements Resolve<any> {
  constructor(private locationService: LocationService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return this.locationService.getIp().pipe(
      mergeMap(ip => this.locationService.getLocationByIp(ip))
    );
  }
}

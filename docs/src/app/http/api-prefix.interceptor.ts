import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

let APP_API_PATH = 'http://dataservice.accuweather.com/';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url = req.url;
    if (url.indexOf('http') !== 0) {
      url = APP_API_PATH + req.url;
    }
    if (!req.url.startsWith('assets')) {
      req = req.clone({
        url
      });
    }
    return next.handle(req);
  }
}

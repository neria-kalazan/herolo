import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzMessageServiceModule } from 'ng-zorro-antd/message';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiPrefixInterceptor } from './http/api-prefix.interceptor';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzListModule } from 'ng-zorro-antd/list';
import { LocationResolver } from './home/location.resolver';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NzButtonModule,
    NzLayoutModule,
    NzMenuModule,
    NzInputModule,
    NzBreadCrumbModule,
    NzGridModule,
    NzCardModule,
    NzIconModule,
    NzFormModule,
    NzSelectModule,
    FormsModule,
    BrowserAnimationsModule,
    NzMessageServiceModule,
    NzTypographyModule,
    NzCollapseModule,
    NzDescriptionsModule,
    NzListModule

  ],
  providers: [
    LocationResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

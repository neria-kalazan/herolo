import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ForecastsService } from '../services/forecasts.service';
import { ActivatedRoute } from '@angular/router';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  busy: boolean = false;
  location: any;
  forecast: any;
  isInFavorite: boolean;
  daysForecasts: any;
  locationOptions: any = [];

  constructor(
    private locationService: LocationService,
    private forecastsService: ForecastsService,
    private msg: NzMessageService,
    private activatedRoute: ActivatedRoute,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.location = this.activatedRoute.snapshot.data.location;
    this.loadData();

  }

  setFavorite() {
    if (this.isInFavorite) {
      this.favoriteService.removeFromFavorites(this.location.Key)
        .subscribe((res) => {
          this.isInFavorite = res;
          this.msg.success('This location removed from favorites successfully!');
        }, (error) => {
          this.msg.error(error.message || 'Failed to use favorite service');
        });
    } else {
      this.favoriteService.addToFavorites(this.location, this.forecast)
        .subscribe((res) => {
          this.isInFavorite = res;
          this.msg.success('This location added to favorites successfully!');
        }, (error) => {
          this.msg.error(error.message || 'Failed to use favorite service');
        });
    }
  }

  loadLocation(keyword) {
    if (!keyword) return;

    this.busy = true;
    this.locationService.getLocationList(keyword)
      .subscribe((resp: any) => {
        this.locationOptions = resp;
      }, error => {
        this.msg.error(error.message || 'Failed to load locations');
      }).add(() => {
      this.busy = false;
    });
  }

  chooseLocation() {
    this.favoriteService.inFavorite(this.location.Key)
      .subscribe((resp: any) => {
        this.isInFavorite = resp;
      }, error => {
        this.msg.error(error.message || 'Failed to load locations');
      });
    this.loadData();
  }

  loadData() {
    this.busy = true;
    this.forecastsService.get1DayOfForecasts(this.location.Key)
      .subscribe((resp: any) => {
        this.forecast = resp;

      }, error => {
        this.msg.error(error.message || 'Failed to load forecast');
      }).add(() => {
      this.forecastsService.getDaysOfForecasts(this.location.Key)
        .subscribe((resp: any) => {
          this.daysForecasts = resp;
        }, error => {
          this.msg.error(error.message || 'Failed to load 5 days forecasts');
        }).add(() => {
        this.busy = false;
      });
    });

  }

}

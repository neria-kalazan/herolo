import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favoriteList: object = {};

  constructor(
    private msg: NzMessageService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.favoriteService.getFavoritsList()
      .subscribe((resp: any) => {
          this.favoriteList = resp;
        }, error => {
          this.msg.error(error.message || 'Failed to load favorite location list');
        });
  }

  remove(locationKey) {
    this.favoriteService.removeFromFavorites(locationKey)
      .subscribe((resp: any) => {
        this.msg.success('location removed from favorite successfully!');
      }, error => {
        this.msg.error(error.message || 'Failed to remove location from favorite');
      });
  }

}

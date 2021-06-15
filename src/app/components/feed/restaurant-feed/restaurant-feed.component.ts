import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/Restaurant.model';

@Component({
  selector: 'app-restaurant-feed',
  templateUrl: './restaurant-feed.component.html',
  styleUrls: ['./restaurant-feed.component.scss']
})
export class RestaurantFeedComponent implements OnInit {

  constructor() { }
@Input() restaurants  : Restaurant[]
  ngOnInit(): void {
    console.log("EsKETIT",this.restaurants)
  }

}

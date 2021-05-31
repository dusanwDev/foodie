import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/Restaurant.model';
import { FeedService } from './feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
allRestaurants:Restaurant[]
  constructor(private feedService:FeedService) { }
  userInput:string;
  ngOnInit(): void {
    this.feedService.getRestaurants().subscribe(restaurants=>{
      this.allRestaurants = restaurants;
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/Customer.model';
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
  customer:Customer
  ngOnInit(): void {
    this.feedService.getRestaurants().subscribe(restaurants=>{
      this.allRestaurants = restaurants;
    })
  this.getUserId()
  }
getUserId(){
  const user:{email:string,expDate:string,localId:string,refreshToken:string,tokenId:string} = JSON.parse(localStorage.getItem("user"))
  return user
}
}

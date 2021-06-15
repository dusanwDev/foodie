import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  feedForm:FormGroup
  ngOnInit(): void {
    this.feedService.getRestaurants().subscribe(restaurants=>{
      this.allRestaurants = restaurants;
    })
  this.getUserId()
  this.feedForm= new FormGroup({
    city:new FormControl(""),
    raiting:new FormControl(""),
    type:new FormControl(""),
    search:new FormControl("")
  })
  }

getUserId(){
  const user:{email:string,expDate:string,localId:string,refreshToken:string,tokenId:string} = JSON.parse(localStorage.getItem("user"))
  return user
}
submit(){

}
}

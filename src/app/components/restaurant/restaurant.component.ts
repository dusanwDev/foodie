import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,

} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from 'src/app/models/Restaurant.model';
import { Utility } from 'src/app/models/Utility.model';
import { FeedService } from '../feed/feed.service';
import { UserService } from '../user-profile/user.service';
import { RestaurantService } from './restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit {
  restaurant: Restaurant;
  displayRestaurantFeaturesBool: boolean;
  categories: string[];
  allRestaurants:Restaurant[]
  userInput:string;
  total = 0
  itemsBought = 0;
  @ViewChild("raiting") raiting : ElementRef
  constructor(
    private restaurantService: RestaurantService,
    private activatedRoute: ActivatedRoute,
    private angularFIrestore: AngularFirestore,
    private feedService:FeedService,
    private userService:UserService
  ) {}
  ngOnInit(): void {
    this.boughtItems();
    this.activatedRoute.params.subscribe((dataId) => {
      this.angularFIrestore
        .collection<Restaurant>(Utility.firestoreName)
        .doc(dataId['restaurantId'])
        .valueChanges()
        .subscribe((data) => {
          this.restaurant = data;
          this.restaurantService.restaurantBehSubject.next(this.restaurant);
          this.displayRestaurantFeatures();
          this.displayToDashboardLink()
          //removing category  duplicates
          let arr = [];
          this.restaurant.dishes.forEach((dish) => {
            arr.push(dish.categoryName);
          });
          this.categories = [...new Set(arr)];

          this.restaurant.restaurantDisplayRaiting= this.restaurant.restaurantRaiting.reduce((sum,value)=>{
            return sum + value
          }) / this.restaurant.restaurantRaiting.length

        });
    });
    this.feedService.getRestaurants().subscribe(restaurants=>{
    this.allRestaurants= restaurants;
    })
  }

  displayRestaurantFeatures() {
    const obj: {
      email: string;
      expDate: string;
      localId: string;
      refreshToken: string;
      tokenId: string;
    } = JSON.parse(localStorage.getItem('user'));
    this.restaurant;
    if (this.restaurant.restaurantId === obj.localId) {
      this.displayRestaurantFeaturesBool = false;
    } else {
      this.displayRestaurantFeaturesBool = true;
    }
  }
displayToDash = false;
  displayToDashboardLink() {
    const user: {
      localId: string;
      idToken: string;
      expDate: Date;
      refreshToken: string;
      email: string;
    } = JSON.parse(localStorage.getItem('user'));
    console.log("IS IT TRUE",this.restaurant.restaurantId === user.localId)
    if (this.restaurant.restaurantId === user.localId) {
      this.displayToDash= true;
    } else {
      this.displayToDash= false;
    }
  }
  addToFavorite(){
    this.userService.addToFavorite(this.restaurant)
  }
  rateRestaurant(event){
    this.raiting.nativeElement.disabled=true;
    this.userService.ratedRestaurants(event,this.restaurant);
  }

  boughtItems(){
  this.userService.itemsCount.subscribe(count=>{this.itemsBought = count}) 
  }
}

import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,

} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, merge } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';
import { Customer } from 'src/app/models/Customer.model';
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
  itemsBought = 0;
  displayToDash = false;
  displayToUserProfile : boolean
  @ViewChild("raiting") raiting : ElementRef
  @ViewChild("favorite") favorite : ElementRef
  userId:string;

  constructor(
    private restaurantService: RestaurantService,
    private activatedRoute: ActivatedRoute,
    private angularFIrestore: AngularFirestore,
    private feedService:FeedService,
    private userService:UserService,
    private renderer2:Renderer2
  ) {}
  ngOnInit(): void {
  this.boughtItems()
  this.getRestaurant()
  this.userService.customerBehSubject.subscribe(data=>{
  this.displayToUserProfile = data ? true:false
  this.userId = this.userService.localUser().localId
  console.log(this.displayToUserProfile )
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
  displayToDashboardLink() {
    const user: {
      localId: string;
      idToken: string;
      expDate: Date;
      refreshToken: string;
      email: string;
    } = JSON.parse(localStorage.getItem('user'));
    if (this.restaurant.restaurantId === user.localId) {
      this.displayToDash= true;
    } else {
      this.displayToDash= false;
    }
  }
  addToFavorite(){
    this.userService.addToFavorite(this.restaurant)
    this.renderer2.setStyle(this.favorite.nativeElement,"display","block")
    setTimeout(() => {
      this.renderer2.setStyle(this.favorite.nativeElement,"display","none")
    }, 3000);
  }
  rateRestaurant(event){
    this.raiting.nativeElement.disabled=true;
    this.userService.ratedRestaurants(event,this.restaurant);
  }

  boughtItems(){
    this.angularFIrestore.collection<Customer>(Utility.firestoreName).doc(this.userService.localUser().localId).valueChanges().subscribe(data=>{
      this.itemsBought = data.addedToCart ? data.addedToCart.length : 0
      this.userId = this.userService.localUser().localId
      })  
    }
    getRestaurant(){
      this.activatedRoute.params.pipe(mergeMap(dataId=> this.angularFIrestore
        .collection<Restaurant>(Utility.firestoreName)
        .doc(dataId['restaurantId'])
        .valueChanges()))
        .subscribe(data=>{
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
        })

      this.feedService.getRestaurants().subscribe(restaurants=>{
      this.allRestaurants= restaurants;
      })
    }
}

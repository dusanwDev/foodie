import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from 'src/app/models/Restaurant.model';
import { UserService } from '../../user-profile/user.service';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  constructor(
    private restaurantService: RestaurantService,
    private activatedRoute: ActivatedRoute,private userService:UserService
  ) {}
  dishes = [];
  cateogryName: string;
  restaurantId:string;
  displayRestaurantFeaturesBool:boolean;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.cateogryName = data['categoryName'].charAt(0).toUpperCase() +  data['categoryName'].slice(1);;
      this.restaurantService.restaurantBehSubject.subscribe((restaurant) => {
        this.restaurantId = restaurant.restaurantId;
        this.displayRestaurantFeatures();

        this.dishes =restaurant.dishes.filter(
                (dish) =>  dish.categoryName === data['categoryName']
              ) 
              if(this.dishes.length===0){
                this.dishes =restaurant.dishes
              }
      });
    });
  }
  sortFoodBy(event) {
    console.log(event);
    switch (event) {
      case 'raiting':
        this.dishes = this.dishes.sort((a, b) => {
          return b.raiting - a.raiting;
        });
        break;
      // case 'fastest':this.restaurant.dishes.sort((a,b)=>{

      // })
      //   break;
      case 'lowestprice':
        this.dishes = this.dishes.sort((a, b) => {
          return a.price - b.price;
        });
        break;
      case 'highestprice':
        this.dishes = this.dishes.sort((a, b) => {
          return b.price - a.price;
        });
        break;

      default:
        break;
    }
  }
  revealOrder(orderItem) {
    if (orderItem.style.height === '' || orderItem.style.height == '0px') {
      orderItem.style.height = 'auto';
    } else {
      orderItem.style.height = '0px';
    }
  }
  displayRestaurantFeatures() {
    const obj: {
      email: string;
      expDate: string;
      localId: string;
      refreshToken: string;
      tokenId: string;
    } = JSON.parse(localStorage.getItem('user'));
    console.log(obj)
    if (this.restaurantId === obj.localId) {
      this.displayRestaurantFeaturesBool = false;
    } else {
      this.displayRestaurantFeaturesBool = true;
    }
    console.log(this.displayRestaurantFeaturesBool);
  }
  addToOrder(dish){
    console.log("CLIC",dish)
    this.userService.addToCart(dish);
    this.dishCount(dish);
  }
  dishCount(dish){
   return this.userService.dishCount(dish);
  }
}

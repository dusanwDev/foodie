import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
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
    private activatedRoute: ActivatedRoute,private userService:UserService,private renderer:Renderer2
  ) {}
  dishes = [];
  cateogryName: string;
  restaurantId:string;
  displayRestaurantFeaturesBool:boolean;
  total = 0

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
  }
  @ViewChild("addToCartAllert") addToCartAllert : ElementRef
  addToOrder(dish){
    this.userService.addToCart(dish);
    this.renderer.setStyle(this.addToCartAllert.nativeElement,"display","inline")

    setTimeout(() => {
      this.renderer.setStyle(this.addToCartAllert.nativeElement,"display","none")
    }, 4000);
    this.addToCartAllert.nativeElement
    this.calculateTotal();
  }
  dishCount(dish?){
  return typeof dish==="undefined" ? 0: this.userService.dishCount(dish).length;
  }
  calculateTotal(){
    this.userService.calculateTotal().subscribe(total=>this.total=total );

  }
}



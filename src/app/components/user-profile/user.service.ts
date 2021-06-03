import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Customer } from 'src/app/models/Customer.model';
import { Restaurant } from 'src/app/models/Restaurant.model';
import { Utility } from 'src/app/models/Utility.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
restaurants:Restaurant[] = []
dishes:{      categoryName: string,
  dishName: string,
  toppings: [string],
  price: number,
  about: string,
  dishId: string,
  ordered?: number,
  image?: string,
  raiting?: number,}[ ]
  customer:Customer
  constructor(private afs : AngularFirestore) { 
    this.localUser()
    this.afs.collection<Customer>(Utility.firestoreName).doc(this.localUser().localId).valueChanges().subscribe(res=>{
      this.restaurants = res.favoriteRestaurants ? res.favoriteRestaurants : [];
      this.dishes = res.addedToCart? res.addedToCart : [];
      this.customer = res
      console.log("GET",this.restaurants)
    })
  }

  private localUser(){
    const user: {
      localId: string;
      idToken: string;
      expDate: Date;
      refreshToken: string;
      email: string;
    } = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  addToFavorite(restaurant:Restaurant){
 this.restaurants.push(restaurant);
 this.restaurants = this.restaurants.filter((v,i,a)=>a.findIndex(t=>(JSON.stringify(t.restaurantName) === JSON.stringify(v.restaurantName)))===i)
 this.afs.collection<Customer>(Utility.firestoreName).doc(this.localUser().localId).update({
      favoriteRestaurants:this.restaurants
    })
  }
addToCart(dish){
  this.dishes.push(dish);
  // this.dishes = this.dishes.filter((v,i,a)=>a.findIndex(t=>(JSON.stringify(t.dishId) === JSON.stringify(v.dishId)))===i)
  this.afs.collection<Customer>(Utility.firestoreName).doc(this.localUser().localId).update({
    addedToCart:this.dishes
  })
}
dishCount(dish){
  let count = 0;
  console.log(dish)
  let arr = []
  if(typeof dish === "undefined"){
    count = 0;
    return arr
  }else{
    this.dishes.forEach(dishFilter=>{
    
      if(dishFilter.dishId===dish.dishId){
        count++
        arr.push(count)
      }
    })
    console.log(count)
    return arr;
  }
  
}
ratedRestaurants(rate,restaurant : Restaurant){
  if(typeof this.customer.ratedRestaurants === "undefined"){
  this.customer.ratedRestaurants =[]
  }
  this.customer.ratedRestaurants = this.customer.ratedRestaurants.filter((v,i,a)=>a.findIndex(t=>(JSON.stringify(t.restaurantId) === JSON.stringify(v.restaurantId)))===i)

  this.customer.ratedRestaurants.push({restaurantId:restaurant.restaurantId,raiting:rate})
  this.afs.collection<Customer>(Utility.firestoreName).doc(this.localUser().localId).update({
    ratedRestaurants:this.customer.ratedRestaurants
  }).then(()=>{

    let raitingsArr:number[] = []
    this.customer.ratedRestaurants.forEach((raiting)=>{
      raitingsArr.push(+raiting.raiting)
    })

    this.afs.collection<Restaurant>(Utility.firestoreName).doc(restaurant.restaurantId).update({
      restaurantRaiting:raitingsArr
    })
    console.log(this.customer.favoriteRestaurants)
  })
  
}
}

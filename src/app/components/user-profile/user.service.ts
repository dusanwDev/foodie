import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, concat, forkJoin } from 'rxjs';
import { map, mergeMap, switchMap, take, takeLast, tap } from 'rxjs/operators';
import { Customer } from 'src/app/models/Customer.model';
import { Restaurant } from 'src/app/models/Restaurant.model';
import { Utility } from 'src/app/models/Utility.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
restaurants:Restaurant[] = []
user = new BehaviorSubject<string>("")
dishes:{categoryName: string,
  dishName: string,
  toppings: [string],
  price: number,
  about: string,
  dishId: string,
  orderProgress:string,
  ordered?: number,
  image?: string,
  raiting?: number[],
  restaurantId:string}[ ]
  customer:Customer
  customerBehSubject = new BehaviorSubject<Customer>(null)
  countOrderBehSubject= new BehaviorSubject<number>(0)
  restaurant:Restaurant
  constructor(private afs : AngularFirestore) { 
    this.localUser()
    this.afs.collection<Customer>(Utility.firestoreName).doc(this.localUser().localId).valueChanges().subscribe(res=>{
      this.restaurants = res.favoriteRestaurants ? res.favoriteRestaurants : [];
      this.dishes = res.addedToCart ? res.addedToCart : [];
      this.customer = res
      this.customerBehSubject.next(this.customer)
    })
  }

   localUser(){
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
  if(typeof this.dishes === "undefined"){
    this.dishes = []
  }
  this.dishes.push(dish);
  // this.dishes = this.dishes.filter((v,i,a)=>a.findIndex(t=>(JSON.stringify(t.dishId) === JSON.stringify(v.dishId)))===i)
  this.afs.collection<Customer>(Utility.firestoreName).doc(this.localUser().localId).update({
    addedToCart:this.dishes
  })
  return this.dishes.length
}
dishCount(dish){
  let count = 0;
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
    let display = raitingsArr.reduce((a, b) => a + b, 0) / raitingsArr.length
    this.afs.collection<Restaurant>(Utility.firestoreName).doc(restaurant.restaurantId).update({
      restaurantRaiting:raitingsArr,restaurantDisplayRaiting:display
    })
  })
  
}
calculateTotal(){
  let total = 0;
  let count = 0;
  return this.afs.collection<Customer>(Utility.firestoreName).doc(this.localUser().localId).valueChanges().pipe(take(1),map(customer=>
  {
      customer.addedToCart.forEach(dish=>{
        total+=dish.price
        count++;
      })
      return total ;
    })
    )
  }

  countOrderedDishes(){
  if(typeof this.dishes !== "undefined"){
     this.countOrderBehSubject.next(this.dishes.length)
  }
  }

  updateCustomerProfile(customerData:{name:string,lastName:string,addres:string,phone:number}){
    this.afs.collection<Customer>(Utility.firestoreName).doc(this.localUser().localId).update({
      customerName:customerData.name,
      customerLastName:customerData.lastName,
      customerAddres:customerData.addres,
      customerPhone:customerData.phone
    })
  }

  updateOrderStatus(inOrderProcessDish){
    console.log(inOrderProcessDish.dishId)
    let foundIndex = this.dishes.findIndex(x=>x.dishId === inOrderProcessDish.dishId)
    this.dishes[foundIndex] = inOrderProcessDish;
    this.afs.collection<Customer>(Utility.firestoreName).doc(this.localUser().localId).update({
      addedToCart:this.dishes
    })
  }

  getOrderCount(dish){
    this.dishes.forEach
    let count = 0;
    return this.afs.collection<Customer>(Utility.firestoreName).doc(this.localUser().localId).valueChanges().pipe(map(data=>{
    data.addedToCart.forEach(data=>{
      if(data.dishId === dish.dishId){
        count++
      }
      return count;
    })
    }))
  }
  rateDish(dish){
    this.afs.collection<Restaurant>(Utility.firestoreName).doc(dish.restaurantId).valueChanges().pipe(take(1)).subscribe(data=>{
        this.restaurant=data
      let index  = data.dishes.findIndex(x=>x.dishId === dish.dishId)
      this.restaurant.dishes[index] = dish;
      this.afs.collection<Restaurant>(Utility.firestoreName).doc(dish.restaurantId).update({
        dishes:this.restaurant.dishes
      })
    })
  }
}

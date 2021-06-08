import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Customer } from 'src/app/models/Customer.model';
import { Utility } from 'src/app/models/Utility.model';
import { RestaurantService } from '../../restaurant/restaurant.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {

  constructor(private afs:AngularFirestore,private userService:UserService,private restaurantService:RestaurantService,private renderer2:Renderer2) { }
  orders :{    dishId: string;
  categoryName: string;
  dishName: string;
  toppings: [string];
  price: number;
  about: string;}[] = []
  @ViewChild("proggres") proggres :ElementRef 
  stage = "Pending"

  ngOnInit(): void {
    this.userService.user.subscribe(userid=>{
      this.afs.collection<Customer>(Utility.firestoreName).doc(userid).valueChanges().subscribe(data=>{
        if(typeof data.addedToCart !== "undefined"){
        this.orders.push(...data.addedToCart)
      }
      })
    })
    this.restaurantService.orderStage.subscribe(stage=>{
      console.log("STAGE",stage)
      switch (stage) {
        case "Preparing": this.stage = stage,this.renderer2.setStyle(this.proggres,"backgroundColor","grey")
          break;
        case "Delivery": this.stage = stage,this.renderer2.setStyle(this.proggres,"backgroundColor","yellow")
          break;
        case "Delivered": this.stage = stage,this.renderer2.setStyle(this.proggres,"backgroundColor","green")
          break;
      
        default:
          break;
      }
    
    })  
  }
  rateRestaurant(rate){
  }
  orderStage(){

  }
}

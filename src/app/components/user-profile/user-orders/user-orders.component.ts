import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Customer } from 'src/app/models/Customer.model';
import { Utility } from 'src/app/models/Utility.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {

  constructor(private afs:AngularFirestore,private userService:UserService) { }
  orders :{    dishId: string;
  categoryName: string;
  dishName: string;
  toppings: [string];
  price: number;
  about: string;}[] = []

  ngOnInit(): void {
    this.userService.user.subscribe(userid=>{
      this.afs.collection<Customer>(Utility.firestoreName).doc(userid).valueChanges().subscribe(data=>{
        
        this.orders.push(...data.addedToCart)
        
      })
    })
    
  }
  rateRestaurant(rate){
  }
}

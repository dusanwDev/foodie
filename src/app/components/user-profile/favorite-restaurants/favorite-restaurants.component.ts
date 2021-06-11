import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Customer } from 'src/app/models/Customer.model';
import { Restaurant } from 'src/app/models/Restaurant.model';
import { Utility } from 'src/app/models/Utility.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-favorite-restaurants',
  templateUrl: './favorite-restaurants.component.html',
  styleUrls: ['./favorite-restaurants.component.scss']
})
export class FavoriteRestaurantsComponent implements OnInit {

  constructor(private afs:AngularFirestore,private userService:UserService) { }

  restaurants:Restaurant[] = []
  userInput: string;
  ngOnInit(): void {
    this.userService.user.subscribe(data=>{
      this.afs.collection<Customer>(Utility.firestoreName).doc(data).valueChanges().subscribe(userData=>{
      this.restaurants.push(...userData.favoriteRestaurants)
      })
    })
  }

}

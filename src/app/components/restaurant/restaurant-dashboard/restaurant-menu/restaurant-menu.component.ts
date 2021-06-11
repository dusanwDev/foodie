import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Restaurant } from 'src/app/models/Restaurant.model';
import { Utility } from 'src/app/models/Utility.model';
import { RestaurantService } from '../../restaurant.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.scss'],
})
export class RestaurantMenuComponent implements OnInit {
  addDishForm: FormGroup;
  categoryName: string;
  restaurant: Restaurant;
  editMode = false;
  dishId: string;
  userInput: string;
  selectedFile: File = null;
  @ViewChild("alert") alert : ElementRef
  constructor(
    private restaurantService: RestaurantService,
    private afs: AngularFirestore,
    private afsStorage: AngularFireStorage,private renderer2:Renderer2
  ) {}

  ngOnInit(): void {
    this.restaurantService.restaurantBehSubject.subscribe(
      (data) => (this.restaurant = data)
    );

    this.addDishForm = new FormGroup({
      newCategory: new FormControl(
        { value: null, disabled: false },
        Validators.required
      ),
      dishName: new FormControl(null, Validators.required),
      toppings: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z A-Z]+$'),
      ]),
      // existingCategory: new FormControl(
      //   { value: null, disabled: false },
      //   Validators.required
      // ),
      price: new FormControl(null, Validators.required),
      about: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
    });
  }
  submit() {
    if (this.editMode === false) {
      if (typeof this.restaurant.dishes === 'undefined') {
        this.restaurant.dishes = [
          {
            about: '',
            categoryName: '',
            dishName: '',
            price: 0,
            toppings: [''],
            ordered: 0,
            dishId: '',
            image: '',restaurantId:""
          },
        ];
        this.restaurant.dishes.pop();
      }
      this.afsStorage.storage
        .ref()
        .child(this.dishId)
        .getDownloadURL()
        .then((data) => {
          this.restaurant.dishes.push({
            about: this.addDishForm
              .get('about')
              .value.split(' ')
              .map((word, index) => {
                if (index < 12) {
                  return word;
                }
              })
              .join(' '),
            categoryName: this.addDishForm.get('newCategory').value,
            dishName: this.addDishForm.get('dishName').value,
            price: this.addDishForm.get('price').value,
            toppings: this.addDishForm.get('toppings').value.split(' '),
            dishId: this.dishId,
            image: data,restaurantId:this.restaurant.restaurantId
          });
          this.afs
            .collection<Restaurant>(Utility.firestoreName)
            .doc(this.restaurant.restaurantId)
            .update({
              dishes: this.restaurant.dishes,
            });
            this.renderer2.setStyle(this.alert.nativeElement,"display","block")
            setTimeout(() => {
              this.renderer2.setStyle(this.alert.nativeElement,"display","none ")
            }, 3000);
          this.addDishForm.reset();
        });

    } else {
      this.afsStorage.storage
        .ref()
        .child(this.dishIdEdit)
        .getDownloadURL()
        .then((data) => {
          this.restaurant.dishes.filter((dish, index) => {
            if (dish.dishId === this.dishIdEdit) {
              this.restaurant.dishes.splice(index, 1);
              this.restaurant.dishes.push({
                about: this.addDishForm.get('about').value,
                categoryName: this.addDishForm.get('newCategory').value,
                dishName: this.addDishForm.get('dishName').value,
                price: this.addDishForm.get('price').value,
                toppings: this.addDishForm.get('toppings').value.split(' '),
                restaurantId:this.restaurant.restaurantId,
                dishId: this.dishIdEdit,
                image: data,
              });
              this.editMode = false;
              return this.restaurant.dishes;
            } else {
              return this.restaurant.dishes;
            }
          });
          this.afs
            .collection<Restaurant>(Utility.firestoreName)
            .doc(this.restaurant.restaurantId)
            .update({
              dishes: this.restaurant.dishes,
            });
            this.renderer2.setStyle(this.alert.nativeElement,"display","block")
            setTimeout(() => {
              this.renderer2.setStyle(this.alert.nativeElement,"display","none ")
            }, 3000);
          this.addDishForm.reset();
        });
    }
  }
  dishIdEdit: string;
  edit(dishes) {
    this.addDishForm.get('dishName').setValue(dishes.dishName);
    this.addDishForm.get('toppings').setValue(dishes.toppings);
    // this.addDishForm
    //   .get('existingCategory')
    //   .setValue(dishes.existingCategory ?? '');
    this.addDishForm.get('price').setValue(dishes.price);
    this.addDishForm.get('about').setValue(dishes.about);
    this.addDishForm.get('newCategory').setValue(dishes.categoryName);
    this.editMode = true;
    this.dishIdEdit = dishes.dishId;
    // document.querySelector<HTMLInputElement>('.dishName').disabled=true;
  }
  remove(index) {
    this.restaurant.dishes.splice(index, 1);
    this.afs
      .collection<Restaurant>(Utility.firestoreName)
      .doc(this.restaurant.restaurantId)
      .update({
        dishes: this.restaurant.dishes,
      });
  }

  onFileSelectedListener(event) {
    this.selectedFile = <File>event.target.files[0];
    if (this.selectedFile.type === 'image/jpeg' || 'image/png') {
      if (this.dishIdEdit) {
        this.afsStorage.upload(this.dishIdEdit, this.selectedFile);
      } else {
        this.dishId = Math.floor(Math.random() * 10000 + 1).toString();
        this.afsStorage.upload(this.dishId, this.selectedFile);
      }
    } else {
      alert('FILE IS NOT A IMAGE');
    }
  }
}

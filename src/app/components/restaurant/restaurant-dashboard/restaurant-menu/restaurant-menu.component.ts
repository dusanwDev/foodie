import { Component, OnInit } from '@angular/core';
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
  constructor(
    private restaurantService: RestaurantService,
    private afs: AngularFirestore,
    private afsStorage: AngularFireStorage
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
      existingCategory: new FormControl(
        { value: null, disabled: false },
        Validators.required
      ),
      price: new FormControl(null, Validators.required),
      about: new FormControl(null, Validators.required),
      image: new FormControl(null),
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
            image: '',
          },
        ];
        this.restaurant.dishes.pop();
      }
      let submit = true;
      this.restaurant.dishes.filter((dish, index) => {
        if (dish.categoryName === this.addDishForm.get('newCategory').value) {
          submit = false;
        }
      });
      if (submit) {
        let img;
        this.afsStorage.upload(this.restaurant.restaurantId, this.selectedFile);
        this.afsStorage.storage
          .ref()
          .child(this.restaurant.restaurantId)
          .getDownloadURL()
          .then((data) => {
            img = data;

            this.restaurant.dishes.push({
              about: this.addDishForm.get('about').value,
              categoryName: this.addDishForm.get('newCategory').value,
              dishName: this.addDishForm.get('dishName').value,
              price: this.addDishForm.get('price').value,
              toppings: this.addDishForm.get('toppings').value.split(' '),
              existingCategory: this.addDishForm.get('existingCategory').value,
              dishId: this.addDishForm.get('dishName').value + '1',
              image: img,
            });
            this.afs
              .collection<Restaurant>(Utility.firestoreName)
              .doc(this.restaurant.restaurantId)
              .update({
                dishes: this.restaurant.dishes,
              });
            this.addDishForm.reset();
          });
      }
    } else {
      // if (typeof this.restaurant.dishes === 'undefined') {
      //   this.restaurant.dishes = [
      //     {
      //       about: '',
      //       categoryName: '',
      //       dishName: '',
      //       price: 0,
      //       toppings: [''],
      //     },
      //   ];
      //   this.restaurant.dishes.pop();
      // }
      this.restaurant.dishes.filter((dish, index) => {
        if (dish.dishId === this.dishId) {
          this.restaurant.dishes.splice(index, 1);

          this.restaurant.dishes.push({
            about: this.addDishForm.get('about').value,
            categoryName: this.addDishForm.get('existingCategory').value,
            dishName: this.addDishForm.get('dishName').value,
            price: this.addDishForm.get('price').value,
            toppings: this.addDishForm.get('toppings').value.split(' '),
            existingCategory: this.addDishForm.get('existingCategory').value,
            dishId: dish.dishId,
            image: this.addDishForm.get('image').value,
          });
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
    }
    document.querySelector('input').disabled = false;
    document.querySelector('select').disabled = false;
    document.querySelector('input').style.backgroundColor =
      'rgb(221, 221, 221)';
  }
  edit(dishes) {
    this.addDishForm.get('dishName').setValue(dishes.dishName);
    this.addDishForm.get('toppings').setValue(dishes.toppings);
    this.addDishForm
      .get('existingCategory')
      .setValue(dishes.existingCategory ?? '');
    this.addDishForm.get('price').setValue(dishes.price);
    this.addDishForm.get('about').setValue(dishes.about);
    this.editMode = true;
    this.dishId = dishes.dishId;
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
  selectedFile: File = null;
  onFileSelectedListener(event) {
    this.selectedFile = <File>event.target.files[0];
    if (this.selectedFile.type === 'image/jpeg' || 'image/png') {
    } else {
      alert('FILE IS NOT A IMAGE');
    }
  }
  onExistingCategory(event) {
    if (event === 'No category') {
      document.querySelector('input').disabled = false;
      this.addDishForm.get('newCategory').setValidators(Validators.required);
      this.addDishForm.get('newCategory').updateValueAndValidity();
      document.querySelector('input').style.backgroundColor =
        'rgb(221, 221, 221)';
    } else {
      document.querySelector('input').disabled = true;
      document.querySelector('input').style.backgroundColor = 'white';
      this.addDishForm.get('newCategory').clearValidators();
      this.addDishForm.get('newCategory').updateValueAndValidity();
    }
  }
  onCategoryInput() {
    if (this.addDishForm.get('newCategory').value === '') {
      document.querySelector('select').disabled = false;
      this.addDishForm
        .get('existingCategory')
        .setValidators(Validators.required);
      this.addDishForm.get('existingCategory').updateValueAndValidity();
    } else {
      this.addDishForm.get('existingCategory').clearValidators();
      this.addDishForm.get('existingCategory').updateValueAndValidity();
      document.querySelector('select').disabled = true;
    }
  }
}

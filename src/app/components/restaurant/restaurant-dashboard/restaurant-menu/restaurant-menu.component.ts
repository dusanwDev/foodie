import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.scss'],
})
export class RestaurantMenuComponent implements OnInit {
  addDishForm: FormGroup;
  categoryName: string;
  constructor() {}

  ngOnInit(): void {
    this.addDishForm = new FormGroup({
      newCategory: new FormControl(
        { value: null, disabled: false },
        Validators.required
      ),
      dishName: new FormControl(null, Validators.required),
      toppings: new FormControl(null, Validators.required),
      existingCategory: new FormControl(
        { value: null, disabled: false },
        Validators.required
      ),
      price:new FormControl(null,Validators.required),
about:new FormControl(null,Validators.required),
    });
  }
  submit() {
    this.addDishForm.reset();
  }
  edit() {
    //napravit i prosledii categoryID
    // this.addDishForm.get('newCategory').setValue('djilas');
    this.addDishForm.get('dishName').setValue('djilas');
    this.addDishForm.get('toppings').setValue('djilas');
    this.addDishForm.get('existingCategory').setValue('djilas');
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

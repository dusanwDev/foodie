import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-restaurant-settings',
  templateUrl: './restaurant-settings.component.html',
  styleUrls: ['./restaurant-settings.component.scss'],
})
export class RestaurantSettingsComponent implements OnInit {
  settingsForm: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.settingsForm = new FormGroup({
      restaurantName: new FormControl(null, Validators.required),
      restaurantAddres: new FormControl(null, Validators.required),
      restaurantImage: new FormControl(null, Validators.required),
    });
  }
  submit() {}
}

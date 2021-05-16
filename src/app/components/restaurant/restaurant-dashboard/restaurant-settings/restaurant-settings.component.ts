import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from '../../restaurant.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Utility } from 'src/app/models/Utility.model';
import { Restaurant } from 'src/app/models/Restaurant.model';

@Component({
  selector: 'app-restaurant-settings',
  templateUrl: './restaurant-settings.component.html',
  styleUrls: ['./restaurant-settings.component.scss'],
})
export class RestaurantSettingsComponent implements OnInit {
  settingsForm: FormGroup;
  selectedFile: File;
  randomNumber: string;

  constructor(
    private restaurantService: RestaurantService,
    private afs: AngularFirestore,
    private afsStorage: AngularFireStorage
  ) {}
  restaurantId: string;
  ngOnInit(): void {
    this.settingsForm = new FormGroup({
      restaurantName: new FormControl(null, Validators.required),
      restaurantAddres: new FormControl(null, Validators.required),
      restaurantImage: new FormControl(null, Validators.required),
      workTime: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      restaurantBannerImage: new FormControl(null, Validators.required),
    });
    this.restaurantService.restaurantBehSubject.subscribe((data) => {
      this.restaurantId = data.restaurantId;
    });
  }
  submit() {
    this.afsStorage.storage
      .ref()
      .child(this.randomNumber)
      .getDownloadURL()
      .then((data) => {
        this.afs
          .collection<Restaurant>(Utility.firestoreName)
          .doc(this.restaurantId)
          .update({
            restaurantName: this.settingsForm.get('restaurantName').value,
            restaurantAddres: this.settingsForm.get('restaurantAddres').value,
            restaurantImage: data,
            workTime: this.settingsForm.get('workTime').value,
            phone: this.settingsForm.get('phone').value,
          });
      });
  }
  onFileSelectedListener(event) {
    this.selectedFile = <File>event.target.files[0];
    if (this.selectedFile.type === 'image/jpeg' || 'image/png') {
      this.randomNumber = Math.floor(Math.random() * 10000 + 1).toString();
      this.afsStorage.upload(this.randomNumber, this.selectedFile);
    } else {
      alert('FILE IS NOT A IMAGE');
    }
  }
  selectedFileBanner: File;
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedComponent } from './components/feed/feed.component';
// import { RestaurantFeedComponent } from './components/restaurant-feed/restaurant-feed.component';
import { RestaurantFeedComponent } from './components/feed/restaurant-feed/restaurant-feed.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { RestaurantDashboardComponent } from './components/restaurant/restaurant-dashboard/restaurant-dashboard.component';
import { RestaurantMenuComponent } from './components/restaurant/restaurant-dashboard/restaurant-menu/restaurant-menu.component';
import { RestaurantSettingsComponent } from './components/restaurant/restaurant-dashboard/restaurant-settings/restaurant-settings.component';
import { RestaurantOrdersComponent } from './components/restaurant/restaurant-dashboard/restaurant-orders/restaurant-orders.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProfileComponent } from './components/user-profile/profile/profile.component';
import { UserOrdersComponent } from './components/user-profile/user-orders/user-orders.component';
import { FavoriteRestaurantsComponent } from './components/user-profile/favorite-restaurants/favorite-restaurants.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { LoginRestaurantComponent } from './components/login-restaurant/login-restaurant.component';
import { RegisterRestaurantComponent } from './components/register-restaurant/register-restaurant.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterMenuPipe } from './components/restaurant/restaurant-dashboard/restaurant-menu/filter-menu.pipe';
import { CategoryComponent } from './components/restaurant/category/category.component';
import { InputComponent } from './components/shared/input/input.component';
import { RestaurantFeedPipe } from './components/feed/restaurant-feed.pipe';
import { UserService } from './components/user-profile/user.service';
import { FeedCategoryComponent } from './components/feed/feed-category/feed-category.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { RestaurantFavoritePipe } from './components/user-profile/favorite-restaurants/restaurant-favorite.pipe';
import { UserOrdersPipe } from './components/user-profile/user-orders/user-orders.pipe';
import { FeedPipePipe } from './components/feed/feed-pipe.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { RestaurantResolver } from './components/restaurant/restaurant.resolver';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    RestaurantFeedComponent,
    RestaurantComponent,
    RestaurantDashboardComponent,
    RestaurantMenuComponent,
    RestaurantSettingsComponent,
    RestaurantOrdersComponent,
    UserProfileComponent,
    ProfileComponent,
    UserOrdersComponent,
    FavoriteRestaurantsComponent,
    LoginUserComponent,
    LoginRestaurantComponent,
    RegisterRestaurantComponent,
    RegisterUserComponent,
    FilterMenuPipe, 
    CategoryComponent,
    InputComponent,
    RestaurantFeedPipe,
    FeedCategoryComponent,
    CheckoutComponent,
    RestaurantFavoritePipe,
    UserOrdersPipe,
    FeedPipePipe,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [RestaurantResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}

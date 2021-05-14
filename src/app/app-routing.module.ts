import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedComponent } from './components/feed/feed.component';
import { LoginRestaurantComponent } from './components/login-restaurant/login-restaurant.component';
import { RegisterRestaurantComponent } from './components/register-restaurant/register-restaurant.component';
import { RestaurantDashboardComponent } from './components/restaurant/restaurant-dashboard/restaurant-dashboard.component';
import { RestaurantMenuComponent } from './components/restaurant/restaurant-dashboard/restaurant-menu/restaurant-menu.component';
import { RestaurantOrdersComponent } from './components/restaurant/restaurant-dashboard/restaurant-orders/restaurant-orders.component';
import { RestaurantSettingsComponent } from './components/restaurant/restaurant-dashboard/restaurant-settings/restaurant-settings.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { FavoriteRestaurantsComponent } from './components/user-profile/favorite-restaurants/favorite-restaurants.component';
import { ProfileComponent } from './components/user-profile/profile/profile.component';
import { UserOrdersComponent } from './components/user-profile/user-orders/user-orders.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  { path: 'feed', component: FeedComponent },
  {
    path: 'restaurant',
    component: RestaurantComponent,
  },
  {
    path: 'restaurant-dashboard',
    component: RestaurantDashboardComponent,
    children: [
      { path: 'menu', component: RestaurantMenuComponent },
      { path: 'orders', component: RestaurantOrdersComponent },
      { path: 'settings', component: RestaurantSettingsComponent },
    ],
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'favorite-rastaurants', component: FavoriteRestaurantsComponent },

      { path: 'user-orders', component: UserOrdersComponent },
    ],
  },
  {
    path: 'restaurant-register',
    component: RegisterRestaurantComponent,
  },
  {
    path: 'restaurant-login',
    component: LoginRestaurantComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

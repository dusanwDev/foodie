import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedComponent } from './components/feed/feed.component';
import { LoginRestaurantComponent } from './components/login-restaurant/login-restaurant.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { RegisterRestaurantComponent } from './components/register-restaurant/register-restaurant.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { CategoryComponent } from './components/restaurant/category/category.component';
import { RestaurantDashboardComponent } from './components/restaurant/restaurant-dashboard/restaurant-dashboard.component';
import { RestaurantMenuComponent } from './components/restaurant/restaurant-dashboard/restaurant-menu/restaurant-menu.component';
import { RestaurantOrdersComponent } from './components/restaurant/restaurant-dashboard/restaurant-orders/restaurant-orders.component';
import { RestaurantSettingsComponent } from './components/restaurant/restaurant-dashboard/restaurant-settings/restaurant-settings.component';
import { RestaurantGuard } from './components/restaurant/restaurant-guard.guard';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { RestaurantResolver } from './components/restaurant/restaurant.resolver';
import { FavoriteRestaurantsComponent } from './components/user-profile/favorite-restaurants/favorite-restaurants.component';
import { ProfileComponent } from './components/user-profile/profile/profile.component';
import { UserGuard } from './components/user-profile/user-guard.guard';
import { UserOrdersComponent } from './components/user-profile/user-orders/user-orders.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  { path: 'feed', component: FeedComponent },
  {
    path: 'restaurant/:restaurantId',
    redirectTo: 'restaurant/:restaurantId/category-name/all',
    pathMatch: 'full',
  },
  {
    path: 'restaurant/:restaurantId',
    resolve:{restaurant : RestaurantResolver },
    children: [
      { path: 'category-name/:categoryName', component: CategoryComponent,  },
    ],
    component: RestaurantComponent,
  },
  {
    path: 'restaurant-dashboard/:restaurantIdDashboard',
    redirectTo: 'restaurant-dashboard/:restaurantIdDashboard/menu',
    pathMatch: 'full',
  },
  {
    path: 'restaurant-dashboard/:restaurantIdDashboard',
    component: RestaurantDashboardComponent,
    canActivate: [RestaurantGuard],
    children: [
      { path: 'menu', component: RestaurantMenuComponent },
      { path: 'orders', component: RestaurantOrdersComponent },
      { path: 'settings', component: RestaurantSettingsComponent },
    ],
  },
  {path:"user-profile/:userid",redirectTo:"user-profile/:userid/profile",pathMatch:"full"},
  {
    path: 'user-profile/:userid',
    component: UserProfileComponent,
    canActivate:[UserGuard],
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
  {
    path: 'user-register',
    component: RegisterUserComponent,
  },
  {
    path: 'user-login',
    component: LoginUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

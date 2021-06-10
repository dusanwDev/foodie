import { RestaurantFavoritePipe } from './restaurant-favorite.pipe';

describe('RestaurantFavoritePipe', () => {
  it('create an instance', () => {
    const pipe = new RestaurantFavoritePipe();
    expect(pipe).toBeTruthy();
  });
});

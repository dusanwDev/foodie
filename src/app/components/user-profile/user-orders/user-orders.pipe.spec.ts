import { UserOrdersPipe } from './user-orders.pipe';

describe('UserOrdersPipe', () => {
  it('create an instance', () => {
    const pipe = new UserOrdersPipe();
    expect(pipe).toBeTruthy();
  });
});

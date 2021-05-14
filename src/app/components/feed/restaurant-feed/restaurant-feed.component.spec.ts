import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantFeedComponent } from './restaurant-feed.component';

describe('RestaurantFeedComponent', () => {
  let component: RestaurantFeedComponent;
  let fixture: ComponentFixture<RestaurantFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

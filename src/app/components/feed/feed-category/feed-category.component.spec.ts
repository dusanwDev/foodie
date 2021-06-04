import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedCategoryComponent } from './feed-category.component';

describe('FeedCategoryComponent', () => {
  let component: FeedCategoryComponent;
  let fixture: ComponentFixture<FeedCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

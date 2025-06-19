import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCategoriesComponent } from './all-products.component';

describe('AllCategoriesComponent', () => {
  let component: AllCategoriesComponent;
  let fixture: ComponentFixture<AllCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

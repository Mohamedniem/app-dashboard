import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOccasionsComponent } from './all-occasions.component';

describe('AllOccasionsComponent', () => {
  let component: AllOccasionsComponent;
  let fixture: ComponentFixture<AllOccasionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllOccasionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllOccasionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

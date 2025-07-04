import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCategoryComponent } from './update-occasion.component';

describe('UpdateCategoryComponent', () => {
  let component: UpdateCategoryComponent;
  let fixture: ComponentFixture<UpdateCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

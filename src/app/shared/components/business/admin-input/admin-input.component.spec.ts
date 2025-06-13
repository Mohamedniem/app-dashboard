import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInputComponent } from './admin-input.component';

describe('AdminInputComponent', () => {
  let component: AdminInputComponent;
  let fixture: ComponentFixture<AdminInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

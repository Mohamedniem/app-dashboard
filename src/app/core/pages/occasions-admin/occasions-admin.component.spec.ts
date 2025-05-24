import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccasionsAdminComponent } from './occasions-admin.component';

describe('OccasionsAdminComponent', () => {
  let component: OccasionsAdminComponent;
  let fixture: ComponentFixture<OccasionsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OccasionsAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OccasionsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

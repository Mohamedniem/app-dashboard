import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBarAdminComponent } from './search-bar-admin.component';

describe('SearchBarAdminComponent', () => {
  let component: InputBarAdminComponent;
  let fixture: ComponentFixture<InputBarAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputBarAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputBarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarAdminComponent } from './search-bar-admin.component';

describe('SearchBarAdminComponent', () => {
  let component: SearchBarAdminComponent;
  let fixture: ComponentFixture<SearchBarAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

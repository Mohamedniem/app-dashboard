import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTableAdminComponent } from './content-table-admin.component';

describe('ContentTableAdminComponent', () => {
  let component: ContentTableAdminComponent;
  let fixture: ComponentFixture<ContentTableAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentTableAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentTableAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

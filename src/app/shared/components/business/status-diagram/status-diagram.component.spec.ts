import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusDiagramComponent } from './status-diagram.component';

describe('StatusDiagramComponent', () => {
  let component: StatusDiagramComponent;
  let fixture: ComponentFixture<StatusDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusDiagramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

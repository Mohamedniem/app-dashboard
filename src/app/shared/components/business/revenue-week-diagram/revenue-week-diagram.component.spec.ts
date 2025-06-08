import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueWeekDiagramComponent } from './revenue-week-diagram.component';

describe('RevenueWeekDiagramComponent', () => {
  let component: RevenueWeekDiagramComponent;
  let fixture: ComponentFixture<RevenueWeekDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevenueWeekDiagramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevenueWeekDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueMonthDiagramComponent } from './revenue-month-diagram.component';

describe('RevenueMonthDiagramComponent', () => {
  let component: RevenueMonthDiagramComponent;
  let fixture: ComponentFixture<RevenueMonthDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevenueMonthDiagramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevenueMonthDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

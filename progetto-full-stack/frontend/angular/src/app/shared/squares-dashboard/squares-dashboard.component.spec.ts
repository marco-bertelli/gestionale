import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquaresDashboardComponent } from './squares-dashboard.component';

describe('SquaresDashboardComponent', () => {
  let component: SquaresDashboardComponent;
  let fixture: ComponentFixture<SquaresDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquaresDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SquaresDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

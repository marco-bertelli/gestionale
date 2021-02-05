import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSortOrdiniComponent } from './table-sort-ordini.component';

describe('TableSortComponent', () => {
  let component: TableSortOrdiniComponent;
  let fixture: ComponentFixture<TableSortOrdiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableSortOrdiniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSortOrdiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

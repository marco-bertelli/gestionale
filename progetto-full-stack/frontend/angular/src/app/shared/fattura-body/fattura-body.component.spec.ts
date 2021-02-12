import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FatturaBodyComponent } from './fattura-body.component';

describe('FatturaBodyComponent', () => {
  let component: FatturaBodyComponent;
  let fixture: ComponentFixture<FatturaBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FatturaBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FatturaBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

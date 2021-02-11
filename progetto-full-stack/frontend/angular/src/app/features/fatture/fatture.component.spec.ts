import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FattureComponent } from './fatture.component';

describe('FattureComponent', () => {
  let component: FattureComponent;
  let fixture: ComponentFixture<FattureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FattureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FattureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

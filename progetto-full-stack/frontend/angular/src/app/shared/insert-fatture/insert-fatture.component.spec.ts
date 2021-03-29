import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertFattureComponent } from './insert-fatture.component';

describe('InsertFattureComponent', () => {
  let component: InsertFattureComponent;
  let fixture: ComponentFixture<InsertFattureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertFattureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertFattureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

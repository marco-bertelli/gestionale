import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFattureFormComponent } from './update-fatture-form.component';

describe('UpdateFattureFormComponent', () => {
  let component: UpdateFattureFormComponent;
  let fixture: ComponentFixture<UpdateFattureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFattureFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFattureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

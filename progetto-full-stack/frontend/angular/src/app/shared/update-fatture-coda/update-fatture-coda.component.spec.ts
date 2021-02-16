import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFattureCodaComponent } from './update-fatture-coda.component';

describe('UpdateFattureCodaComponent', () => {
  let component: UpdateFattureCodaComponent;
  let fixture: ComponentFixture<UpdateFattureCodaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFattureCodaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFattureCodaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

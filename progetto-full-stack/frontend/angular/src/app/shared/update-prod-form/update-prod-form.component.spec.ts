import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProdFormComponent } from './update-prod-form.component';

describe('UpdateProdFormComponent', () => {
  let component: UpdateProdFormComponent;
  let fixture: ComponentFixture<UpdateProdFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProdFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProdFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

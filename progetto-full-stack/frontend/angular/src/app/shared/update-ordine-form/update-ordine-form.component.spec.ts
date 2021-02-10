import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrdineFormComponent } from './update-ordine-form.component';

describe('UpdateOrdineFormComponent', () => {
  let component: UpdateOrdineFormComponent;
  let fixture: ComponentFixture<UpdateOrdineFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOrdineFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOrdineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonebrandsComponent } from './phonebrands.component';

describe('PhonebrandsComponent', () => {
  let component: PhonebrandsComponent;
  let fixture: ComponentFixture<PhonebrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhonebrandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonebrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

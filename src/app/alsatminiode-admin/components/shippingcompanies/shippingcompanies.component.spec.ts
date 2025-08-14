import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingcompaniesComponent } from './shippingcompanies.component';

describe('ShippingcompaniesComponent', () => {
  let component: ShippingcompaniesComponent;
  let fixture: ComponentFixture<ShippingcompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingcompaniesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingcompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSuccessDialogComponent } from './customer-success-dialog.component';

describe('CustomerSuccessDialogComponent', () => {
  let component: CustomerSuccessDialogComponent;
  let fixture: ComponentFixture<CustomerSuccessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerSuccessDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

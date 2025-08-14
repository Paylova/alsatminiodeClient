import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectShippingCompanyImageFileDialogComponent } from './select-shipping-company-image-file-dialog.component';

describe('SelectShippingCompanyImageFileDialogComponent', () => {
  let component: SelectShippingCompanyImageFileDialogComponent;
  let fixture: ComponentFixture<SelectShippingCompanyImageFileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectShippingCompanyImageFileDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectShippingCompanyImageFileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

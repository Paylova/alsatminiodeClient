import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProductBrandImageDialogComponent } from './select-product-brand-image-dialog.component';

describe('SelectProductBrandImageDialogComponent', () => {
  let component: SelectProductBrandImageDialogComponent;
  let fixture: ComponentFixture<SelectProductBrandImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectProductBrandImageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProductBrandImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

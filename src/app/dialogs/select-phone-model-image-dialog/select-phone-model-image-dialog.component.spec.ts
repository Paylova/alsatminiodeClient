import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPhoneModelImageDialogComponent } from './select-phone-model-image-dialog.component';

describe('SelectPhoneModelImageDialogComponent', () => {
  let component: SelectPhoneModelImageDialogComponent;
  let fixture: ComponentFixture<SelectPhoneModelImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPhoneModelImageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPhoneModelImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

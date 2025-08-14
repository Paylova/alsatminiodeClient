import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneQuestionDialogComponent } from './phone-question-dialog.component';

describe('PhoneQuestionDialogComponent', () => {
  let component: PhoneQuestionDialogComponent;
  let fixture: ComponentFixture<PhoneQuestionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneQuestionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

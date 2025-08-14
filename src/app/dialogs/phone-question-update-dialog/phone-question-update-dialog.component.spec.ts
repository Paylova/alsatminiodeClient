import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneQuestionUpdateDialogComponent } from './phone-question-update-dialog.component';

describe('PhoneQuestionUpdateDialogComponent', () => {
  let component: PhoneQuestionUpdateDialogComponent;
  let fixture: ComponentFixture<PhoneQuestionUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneQuestionUpdateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneQuestionUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

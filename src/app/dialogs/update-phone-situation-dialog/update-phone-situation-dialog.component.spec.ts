import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePhoneSituationDialogComponent } from './update-phone-situation-dialog.component';

describe('UpdatePhoneSituationDialogComponent', () => {
  let component: UpdatePhoneSituationDialogComponent;
  let fixture: ComponentFixture<UpdatePhoneSituationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePhoneSituationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePhoneSituationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePhoneModelComponent } from './update-phone-model.component';

describe('UpdatePhoneModelComponent', () => {
  let component: UpdatePhoneModelComponent;
  let fixture: ComponentFixture<UpdatePhoneModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePhoneModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePhoneModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

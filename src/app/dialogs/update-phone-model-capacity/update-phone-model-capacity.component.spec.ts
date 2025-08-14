import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePhoneModelCapacityComponent } from './update-phone-model-capacity.component';

describe('UpdatePhoneModelCapacityComponent', () => {
  let component: UpdatePhoneModelCapacityComponent;
  let fixture: ComponentFixture<UpdatePhoneModelCapacityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePhoneModelCapacityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePhoneModelCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

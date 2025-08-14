import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectionOfPersonalDataComponent } from './protection-of-personal-data.component';

describe('ProtectionOfPersonalDataComponent', () => {
  let component: ProtectionOfPersonalDataComponent;
  let fixture: ComponentFixture<ProtectionOfPersonalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtectionOfPersonalDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectionOfPersonalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

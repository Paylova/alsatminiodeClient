import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonemodelsComponent } from './phonemodels.component';

describe('PhonemodelsComponent', () => {
  let component: PhonemodelsComponent;
  let fixture: ComponentFixture<PhonemodelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhonemodelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonemodelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

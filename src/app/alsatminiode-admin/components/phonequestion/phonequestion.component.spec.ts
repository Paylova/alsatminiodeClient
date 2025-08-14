import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonequestionComponent } from './phonequestion.component';

describe('PhonequestionComponent', () => {
  let component: PhonequestionComponent;
  let fixture: ComponentFixture<PhonequestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhonequestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonequestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

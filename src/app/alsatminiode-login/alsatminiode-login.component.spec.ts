import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlsatminiodeLoginComponent } from './alsatminiode-login.component';

describe('AlsatminiodeLoginComponent', () => {
  let component: AlsatminiodeLoginComponent;
  let fixture: ComponentFixture<AlsatminiodeLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlsatminiodeLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlsatminiodeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

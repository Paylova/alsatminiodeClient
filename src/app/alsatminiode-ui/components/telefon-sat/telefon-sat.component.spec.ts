import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelefonSatComponent } from './telefon-sat.component';

describe('TelefonSatComponent', () => {
  let component: TelefonSatComponent;
  let fixture: ComponentFixture<TelefonSatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelefonSatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelefonSatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

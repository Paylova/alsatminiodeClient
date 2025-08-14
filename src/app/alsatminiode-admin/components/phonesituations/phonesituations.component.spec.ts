import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonesituationsComponent } from './phonesituations.component';

describe('PhonesituationsComponent', () => {
  let component: PhonesituationsComponent;
  let fixture: ComponentFixture<PhonesituationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhonesituationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonesituationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

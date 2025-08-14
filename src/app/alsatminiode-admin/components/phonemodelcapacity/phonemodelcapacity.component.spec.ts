import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonemodelcapacityComponent } from './phonemodelcapacity.component';

describe('PhonemodelcapacityComponent', () => {
  let component: PhonemodelcapacityComponent;
  let fixture: ComponentFixture<PhonemodelcapacityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhonemodelcapacityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhonemodelcapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

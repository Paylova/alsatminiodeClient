import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CihazinidegerlendirComponent } from './cihazinidegerlendir.component';

describe('CihazinidegerlendirComponent', () => {
  let component: CihazinidegerlendirComponent;
  let fixture: ComponentFixture<CihazinidegerlendirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CihazinidegerlendirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CihazinidegerlendirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YakindaComponent } from './yakinda.component';

describe('YakindaComponent', () => {
  let component: YakindaComponent;
  let fixture: ComponentFixture<YakindaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YakindaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YakindaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

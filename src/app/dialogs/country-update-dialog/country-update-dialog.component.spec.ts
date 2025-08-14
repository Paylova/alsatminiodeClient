import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryUpdateDialogComponent } from './country-update-dialog.component';

describe('CountryUpdateDialogComponent', () => {
  let component: CountryUpdateDialogComponent;
  let fixture: ComponentFixture<CountryUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryUpdateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

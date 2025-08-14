import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteoptionsComponent } from './websiteoptions.component';

describe('WebsiteoptionsComponent', () => {
  let component: WebsiteoptionsComponent;
  let fixture: ComponentFixture<WebsiteoptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebsiteoptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteoptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

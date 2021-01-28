import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XychartComponent } from './xychart.component';

describe('XychartComponent', () => {
  let component: XychartComponent;
  let fixture: ComponentFixture<XychartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XychartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XychartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

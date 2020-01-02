import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedOrderViewComponent } from './finished-order-view.component';

describe('FinishedOrderViewComponent', () => {
  let component: FinishedOrderViewComponent;
  let fixture: ComponentFixture<FinishedOrderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishedOrderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedOrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

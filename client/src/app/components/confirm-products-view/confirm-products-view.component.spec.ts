import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmProductsViewComponent } from './confirm-products-view.component';

describe('ConfirmProductsViewComponent', () => {
  let component: ConfirmProductsViewComponent;
  let fixture: ComponentFixture<ConfirmProductsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmProductsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmProductsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

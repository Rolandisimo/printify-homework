import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareProductsTableComponent } from './prepare-products-table.component';

describe('PrepareProductsTableComponent', () => {
  let component: PrepareProductsTableComponent;
  let fixture: ComponentFixture<PrepareProductsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepareProductsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepareProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

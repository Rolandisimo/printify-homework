import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportOrderViewComponent } from './import-order-view.component';

describe('ImportOrderViewComponent', () => {
  let component: ImportOrderViewComponent;
  let fixture: ComponentFixture<ImportOrderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportOrderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportOrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

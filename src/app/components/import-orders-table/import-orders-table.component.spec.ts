import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportOrdersTableComponent } from './import-orders-table.component';

describe('ImportOrdersTableComponent', () => {
  let component: ImportOrdersTableComponent;
  let fixture: ComponentFixture<ImportOrdersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportOrdersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportOrdersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

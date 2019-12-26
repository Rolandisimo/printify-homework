import { TestBed } from '@angular/core/testing';

import { UnfinishedOrdersService } from './unfinished-orders.service';

describe('UnfinishedOrdersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnfinishedOrdersService = TestBed.get(UnfinishedOrdersService);
    expect(service).toBeTruthy();
  });
});

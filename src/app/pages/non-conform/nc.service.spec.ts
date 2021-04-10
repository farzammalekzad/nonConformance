import { TestBed } from '@angular/core/testing';

import { NcService } from './nc.service';

describe('NcService', () => {
  let service: NcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

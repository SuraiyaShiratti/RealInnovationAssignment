import { TestBed } from '@angular/core/testing';

import { IndexDbService } from './indexdb.service';

describe('IndexdbService', () => {
  let service: IndexDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { HttpcomminicationsService } from './httpcomminications.service';

describe('HttpcomminicationsService', () => {
  let service: HttpcomminicationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpcomminicationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

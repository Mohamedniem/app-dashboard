import { TestBed } from '@angular/core/testing';

import { AllCateogriesService } from './all-cateogries.service';

describe('AllCateogriesService', () => {
  let service: AllCateogriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllCateogriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

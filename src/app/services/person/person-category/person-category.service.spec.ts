import { TestBed } from '@angular/core/testing';

import { PersonCategoriesService } from './person-categories.service';

describe('PersonCategoriesService', () => {
  let service: PersonCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

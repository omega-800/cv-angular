import { TestBed } from '@angular/core/testing';

import { ProjectFilterService } from './project-filter.service';

describe('ProjectFilterService', () => {
  let service: ProjectFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

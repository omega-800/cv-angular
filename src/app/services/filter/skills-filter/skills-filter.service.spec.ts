import { TestBed } from '@angular/core/testing';

import { SkillsFilterService } from './skills-filter.service';

describe('SkillsFilterService', () => {
  let service: SkillsFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillsFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

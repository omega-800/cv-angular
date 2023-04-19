import { TestBed } from '@angular/core/testing';

import { SkillCategoriesService } from './skill-categories.service';

describe('SkillCategoriesService', () => {
  let service: SkillCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

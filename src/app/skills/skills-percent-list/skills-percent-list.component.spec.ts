import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsPercentListComponent } from './skills-percent-list.component';

describe('SkillsPercentListComponent', () => {
  let component: SkillsPercentListComponent;
  let fixture: ComponentFixture<SkillsPercentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsPercentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsPercentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

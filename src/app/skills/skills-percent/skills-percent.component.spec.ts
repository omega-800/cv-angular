import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsPercentComponent } from './skills-percent.component';

describe('SkillsPercentComponent', () => {
  let component: SkillsPercentComponent;
  let fixture: ComponentFixture<SkillsPercentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsPercentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsPercentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

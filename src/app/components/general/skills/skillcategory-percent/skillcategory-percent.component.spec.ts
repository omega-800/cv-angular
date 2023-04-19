import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillcategoryPercentComponent } from './skillcategory-percent.component';

describe('SkillcategoryPercentComponent', () => {
  let component: SkillcategoryPercentComponent;
  let fixture: ComponentFixture<SkillcategoryPercentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillcategoryPercentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillcategoryPercentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

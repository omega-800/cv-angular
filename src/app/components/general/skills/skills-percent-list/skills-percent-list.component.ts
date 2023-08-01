import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkillService } from 'src/app/services/skills/skill/skill.service';
import { SkillEntity } from 'src/app/services/skills/skill/skill.model';
import { SkillCategoriesService } from 'src/app/services/skills/skill-category/skill-category.service';
import { SkillSubCategoryEntity } from 'src/app/services/skills/skill-category/skill-category.model';
import { SkillsPercentComponent } from '../skills-percent/skills-percent.component';
import { KeyValuePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-skills-percent-list',
  templateUrl: './skills-percent-list.component.html',
  styleUrls: ['./skills-percent-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SkillsPercentComponent, NgFor, KeyValuePipe]
})
export class SkillsPercentListComponent {
  types: { [key: string]: string };
  allSkillSubCategories: SkillSubCategoryEntity[];
  allSkills: SkillEntity[];
  allSkillsByType: { [key: string]: SkillEntity[] } = {};

  constructor(private skillService: SkillService, private skillCategoriesService: SkillCategoriesService) {
    this.types = this.skillService.getSkillTypes();
    this.allSkillSubCategories = this.skillCategoriesService.getSkillSubCategories();
    this.allSkills = this.skillService.getSkills();
    for (const [key, value] of Object.entries(this.types)) {
      this.allSkillsByType[value] = this.skillService.getSkillsByType(value);
    }
  }
}

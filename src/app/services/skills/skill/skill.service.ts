import { Injectable } from '@angular/core';
import { SkillEntity, SkillOnly, SkillTypes } from './skill.model';
import * as skillData from 'src/data/skill.json';
import { AbilityService } from '../ability/ability.service';
import { ActivityService } from '../activity/activity.service';
import { ApplicationService } from '../application/application.service';
import { KnowledgeService } from '../knowledge/knowledge.service';
import { LanguageService } from '../language/language.service';
import { SkillCategoriesService } from '../skill-category/skill-category.service';
import { ApplicationEntity } from '../application/application.model';
import { LanguageEntity } from '../language/language.model';
import { KnowledgeEntity } from '../knowledge/knowledge.model';
import { ActivityEntity } from '../activity/activity.model';
import { AbilityEntity } from '../ability/ability.model';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private onlySkills: SkillOnly[] = (skillData as any).default;
  private skills: SkillEntity[];

  constructor(
    private skillCategoriesService: SkillCategoriesService,
    private applicationService: ApplicationService,
    private languageService: LanguageService,
    private knowledgeService: KnowledgeService,
    private activityService: ActivityService,
    private abilityService: AbilityService
  ) {
    this.skills = this.onlySkills.map((skill) =>
      this.fillSkillSortProps(skill)
    );
  }

  getSkillById(id: string): SkillEntity {
    return Object.values(this.skills).filter(
      (skill) => skill.skill_id === id
    )[0];
  }

  getSkills(): SkillEntity[] {
    return this.skills;
  }

  getSkillTypes() {
    return SkillTypes;
  }

  getSkillsByType(type: string): SkillEntity[] {
    return Object.values(this.skills).filter((skill) => skill.type === type);
  }

  fillSkillSortProps(skill: SkillOnly): SkillEntity {
    if (skill.application_id !== '') {
      let app: ApplicationEntity = this.applicationService.getApplicationById(
        skill.application_id
      );
      return {
        ...skill,
        skillcategories:
          this.skillCategoriesService.getSkillCategoriesOfSkill(skill),
        skillsubcategories:
          this.skillCategoriesService.getSkillSubCategoriesOfSkill(skill),
        ...app,
        id: 'skill_' + skill.skill_id,
        type: SkillTypes.application,
        icon: {
          id: 'icon_' + skill.skill_id,
          name: skill.identifier + ' Icon',
          path: "assets/" + app.thumbnail,
          alt: app.name + ' Icon',
        },
      };
    }
    if (skill.language_id !== '') {
      let language: LanguageEntity = this.languageService.getLanguageById(
        skill.language_id
      );
      return {
        ...skill,
        skillcategories:
          this.skillCategoriesService.getSkillCategoriesOfSkill(skill),
        skillsubcategories:
          this.skillCategoriesService.getSkillSubCategoriesOfSkill(skill),
        ...language,
        id: 'skill_' + skill.skill_id,
        type: SkillTypes.language,
        icon: {
          id: 'icon_' + skill.skill_id,
          name: skill.identifier + ' Icon',
          path: "assets/" + language.thumbnail,
          alt: language.name + ' Icon',
        },
      };
    }
    if (skill.knowledge_id !== '') {
      let knowledge: KnowledgeEntity = this.knowledgeService.getKnowledgeById(
        skill.knowledge_id
      );
      return {
        ...skill,
        skillcategories:
          this.skillCategoriesService.getSkillCategoriesOfSkill(skill),
        skillsubcategories:
          this.skillCategoriesService.getSkillSubCategoriesOfSkill(skill),
        ...knowledge,
        id: 'skill_' + skill.skill_id,
        type: SkillTypes.knowledge,
        icon: {
          id: 'icon_' + skill.skill_id,
          name: skill.identifier + ' Icon',
          path: "assets/" + knowledge.thumbnail,
          alt: knowledge.name + ' Icon',
        },
      };
    }
    if (skill.activity_id !== '') {
      let activity: ActivityEntity = this.activityService.getActivityById(
        skill.activity_id
      );
      return {
        ...skill,
        skillcategories:
          this.skillCategoriesService.getSkillCategoriesOfSkill(skill),
        skillsubcategories:
          this.skillCategoriesService.getSkillSubCategoriesOfSkill(skill),
        ...activity,
        id: 'skill_' + skill.skill_id,
        type: SkillTypes.activity,
        icon: {
          id: 'icon_' + skill.skill_id,
          name: skill.identifier + ' Icon',
          path: "assets/" + activity.thumbnail,
          alt: activity.name + ' Icon',
        },
      };
    }
    if (skill.ability_id !== '') {
      let ability: AbilityEntity = this.abilityService.getAbilityById(
        skill.ability_id
      );
      return {
        ...skill,
        skillcategories:
          this.skillCategoriesService.getSkillCategoriesOfSkill(skill),
        skillsubcategories:
          this.skillCategoriesService.getSkillSubCategoriesOfSkill(skill),
        ...ability,
        id: 'skill_' + skill.skill_id,
        type: SkillTypes.ability,
        icon: {
          id: 'icon_' + skill.skill_id,
          name: skill.identifier + ' Icon',
          path: "assets/" + ability.thumbnail,
          alt: ability.name + ' Icon',
        },
      };
    }
    return {
      ...skill,
      id: 'skill_' + skill.skill_id,
      skillcategories:
        this.skillCategoriesService.getSkillCategoriesOfSkill(skill),
      skillsubcategories:
        this.skillCategoriesService.getSkillSubCategoriesOfSkill(skill),
      type: '',
      name: '',
      name_e: '',
      name_r: '',
      description: '',
      description_e: '',
      description_r: '',
      thumbnail: '',
      image: '',
      url: '',
      icon: {
        id: 'no_icon',
        name: 'No Icon',
        path: '',
        alt: 'No Icon',
      },
    };
  }
}
